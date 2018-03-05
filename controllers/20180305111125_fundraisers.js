exports.up = function(knex, Promise) {
   return Promise.all([
    knex.schema.createTable('fundraisers', function(table) {
        table.increments('fundraiserId');
        table.string('title');
        table.string('content');
        table.string('walletAddress');
        table.foreign('charity').references('charityId').inTable('charities');
        table.string('location');
        table.timestamps();
      })
  ]);
};

exports.down = function(knex, Promise) {
   return Promise.all([
    knex.schema.dropTableIfExists('fundraisers')
  ])
};
