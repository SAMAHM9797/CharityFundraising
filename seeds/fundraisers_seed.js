
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('fundraisers').del(), 


    // Inserts seed entries
    knex('fundraisers').insert({
      fundraiserId: 1, 
      title: 'headsInc',
      content : 'memes',
      charity : 1,
      location : 'manchester'
    })
  );
};
