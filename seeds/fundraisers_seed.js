
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('fundraisers').del(), 


    // Inserts seed entries
    knex('fundraisers').insert({
      id: 1, 
      title: 'headsInc',
      content : 'memes',
      charity : 1,
      walletAddress :'mrdn1ShuwZXBcer9K8K1bRgQ2So7xXREMa',
      location : 'manchester'
    })
  );
};
