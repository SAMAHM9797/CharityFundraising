
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('blogs').del(), 

    // Inserts seed entries
    knex('blogs').insert({
        title: "blog 1", 
        content: "this is a blog",
        created_at: new Date(2018,1,2)
    }),
    knex('blogs').insert({
        title: "blog 2", 
        content: "this is a blog",
        created_at: new Date(2018,1,2)
    }),
    knex('blogs').insert({
        title: "blog 2", 
        content: "this is a blog",
    })
  );
};
