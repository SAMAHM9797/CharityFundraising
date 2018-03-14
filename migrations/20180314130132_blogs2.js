
exports.up = function(knex, Promise) {
   return Promise.all([
    knex.schema.dropTableIfExists('blogs'),
    knex.schema.createTable('blogs', function(table) {
      table.increments();
      table.string('title');
      table.string('content');
      table.enu('state', ['draft', 'published','archived']).defaultTo('draft');
      table.timestamp('deleted_at').nullable().defaultTo(null);
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
   return Promise.all([
    knex.schema.dropTable('blogs')
  ])
};
