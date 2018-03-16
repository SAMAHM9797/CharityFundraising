
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('charities').del(), 

    // Inserts seed entries
    knex('charities').insert({
      id:1,
      email: "testEmail@heads.com", 
      name: 'Middleton',
      content : 'this is a charity'
    }),
    
    knex('charities').insert({
      id:2,
      email: "heads@heads.com", 
      name: 'Heads',
      content : 'this is a charity'
      
    })
  );
};
