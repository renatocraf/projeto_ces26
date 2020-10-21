const queries = require('./queries')

module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const announcement = { ...req.body }
        if(req.params.id) announcement.id = req.params.id

        try {
            existsOrError(announcement.name, 'Nome não informado')
            existsOrError(announcement.description, 'Descrição não informada')
            existsOrError(announcement.categoryId, 'Categoria não informada')
            existsOrError(announcement.userId, 'Autor não informado')
            existsOrError(announcement.content, 'Conteúdo não informado')
        } catch(msg) {
            res.status(400).send(msg)
        }

        if(announcement.id) {
            app.db('announcements')
                .update(announcement)
                .where({ id: announcement.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('announcements')
                .insert(announcement)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }
        const remove = async (req, res) => {
            try {
                const rowsDeleted = await app.db('announcements')
                    .where({ id: req.params.id }).del()
                
                try {
                    existsOrError(rowsDeleted, 'Anúncio não foi encontrado.')
                } catch(msg) {
                    return res.status(400).send(msg)    
                }
    
                res.status(204).send()
            } catch(msg) {
                res.status(500).send(msg)
            }
        }
    
        const limit = 10 // usado para paginação
        const get = async (req, res) => {
            const page = req.query.page || 1
    
            const result = await app.db('announcements').count('id').first()
            const count = parseInt(result.count)
            
            app.db('announcements')
            .select('id', 'name', 'description')
            .limit(limit).offset(page * limit - limit)
            .then(announcements => res.json({ data: announcements, count, limit }))
            .catch(err => res.status(500).send(err))
            
        }

        const getById = (req, res) => {
            app.db('announcements')
                .where({ id: req.params.id })
                .first()
                .then(announcement => {
                    announcement.content = announcement.content.toString()
                    return res.json(announcement)
                })
                .catch(err => res.status(500).send(err))
        }
    
        const getByCategory = async (req, res) => {
            const categoryId = req.params.id
            const page = req.query.page || 1
            const categories = await app.db.raw(queries.categoryWithChildren, categoryId)
            const ids = categories.rows.map(c => c.id)
    
            app.db({a: 'announcements', u: 'users'})
                .select('a.id', 'a.name', 'a.description', 'a.imageUrl', { author: 'u.name' })
                .limit(limit).offset(page * limit - limit)
                .whereRaw('?? = ??', ['u.id', 'a.userId'])
                .whereIn('categoryId', ids)
                .orderBy('a.id', 'desc')
                .then(announcements => res.json(announcements))
                .catch(err => res.status(500).send(err))
        }

    return { save, remove, get, getById, getByCategory }
}
