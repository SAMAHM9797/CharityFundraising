exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('roles'),
        knex.schema.createTable('roles', function(table) {
            table.increments();
            table.string('role');
            table.timestamps();
        }),

        knex.schema.dropTableIfExists('users'),
        knex.schema.createTable('users', function(table) {
            table.increments();
            table.string('name');
            table.string('email').unique();
            table.string('password');
            table.string('passwordResetToken');
            table.dateTime('passwordResetExpires');
            table.string('picture');
            table.string('facebook');
            table.string('twitter');
            table.string('google');
            table.string('vk');
            table.integer('role').unsigned();
            table.foreign('role').references('id').inTable('roles');
            table.timestamps();
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('roles'),
        knex.schema.dropTableIfExists('users')
    ])
};
