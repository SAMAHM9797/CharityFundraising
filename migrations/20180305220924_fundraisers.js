exports.up = function(knex, Promise) {
   return Promise.all([
    knex.schema.createTable('fundraisers', function(table) {
        table.increments('fundraiserId');
        table.string('title');
        table.string('content');
        table.string('walletAddress');
        table.string('location');
        table.integer('charity').unsigned().notNullable();
        table.timestamps();
        
        table.foreign('charity').references('charityId').inTable('charities');
      })
  ]);
};

exports.down = function(knex, Promise) {
   return Promise.all([
    knex.schema.dropTable('fundraisers')
  ])
};
