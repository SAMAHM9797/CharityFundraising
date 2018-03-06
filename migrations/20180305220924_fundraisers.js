exports.up = function(knex, Promise) {
   return Promise.all([
    knex.schema.createTable('fundraisers', function(table) {
        table.increments();
        table.string('title');
        table.string('content');
        table.string('walletAddress');
        table.string('location');
        table.integer('charity').unsigned().notNullable();
        table.timestamps();
        table.foreign('charity').references('id').inTable('charities');
      })
  ]);
};

exports.down = function(knex, Promise) {
   return Promise.all([
    knex.schema.dropTable('fundraisers')
  ])
};