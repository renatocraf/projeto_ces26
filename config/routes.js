const csrfProtection = require('csrf')

module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        //.all(app.config.passport.authenticate())
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.route('/users/:id')
        //.all(app.config.passport.authenticate())
        .put(app.api.user.save)
        .get(app.api.user.getById)
    
    app.route('/categories')
        //.all(app.config.passport.authenticate())
        .get(app.api.category.get)
        .post(app.api.category.save)

    app.route('/categories/:id')
        //.all(app.config.passport.authenticate())
        .get(app.api.category.getById)
        .put(app.api.category.save)
    
    app.route('/announcements')
        //.all(app.config.passport.authenticate())
        .get(csrfProtection, app.api.announcement.get)
        .post(app.api.announcement.save)

    app.route('/announcements/:id')
        //.all(app.config.passport.authenticate())
        .get(app.api.announcement.getById)
        .put(app.api.announcement.save)
        .delete(app.api.announcement.remove)

    app.route('/categories/:id/announcements')
        //.all(app.config.passport.authenticate())
        .get(app.api.announcement.getByCategory)
        
}