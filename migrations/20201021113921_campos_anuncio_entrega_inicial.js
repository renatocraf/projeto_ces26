
exports.up = function (knex, Promise) {
    return knex.schema.alterTable('announcements', table => {
        table.string('anunciante').notNull()
        table.string('telefone').notNull()
        table.float('preco',14,2).notNull()
        table.float('latitude').notNull()
        table.float('longitude').notNull()

        table.dropColumn('userId')
        table.dropColumn('content')
    })
};


exports.down = function (knex, Promise) {
    return knex.schema.alterTable('announcements', table => {
        table.dropColumn('anunciante')
        table.dropColumn('telefone')
        table.dropColumn('preco')
        table.dropColumn('latitude')
        table.dropColumn('longitude')

        table.binary('content').notNull()
        table.integer('userId').references('id')
            .inTable('users').notNull()
    })
};