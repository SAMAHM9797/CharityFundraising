
exports.up = function(knex, Promise) {
   return Promise.all([
    knex.schema.createTable('charities', function(table) {
      table.increments();
      table.string('email').unique();
      table.string('name');
      table.string('content');
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
   return Promise.all([
    knex.schema.dropTableIfExists('charities')
  ])
};
