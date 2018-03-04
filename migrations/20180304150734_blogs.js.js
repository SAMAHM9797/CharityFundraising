
exports.up = function(knex, Promise) {
   return Promise.all([
    knex.schema.createTable('blogs', function(table) {
      table.increments();
      table.string('title');
      table.string('content');
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
   return Promise.all([
    knex.schema.dropTable('blogs')
  ])
};
