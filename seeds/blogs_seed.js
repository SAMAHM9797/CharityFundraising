
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('blogs').del(), 

    // Inserts seed entries
    knex('blogs').insert({
        title: "i love memes", 
        content: "memes are so good"
    }),
    knex('blogs').insert({
        title: "i love memes", 
        content: "memes are so good"
    }),
    knex('blogs').insert({
        title: "i love memes", 
        content: "memes are so good"
    })
  );
};
