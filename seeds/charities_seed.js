
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('charities').del(), 

    // Inserts seed entries
    knex('charities').insert({
      id : 1,
      email: "testEmail@heads.com", 
      name: 'Heads Charity',
      content : 'this is a charity'
      
    })
  );
};
