
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('blogs').del(), 

    // Inserts seed entries
    knex('blogs').insert([
    {
        title: "IS Crypto DEAADD?!!!!",
        content: "clickbate content lol",
    },
    {
        title: "TOP TEN COINS 2018",
        content: "clickbate content lol",
    },
    {
        title: "memes are",
        content: "clickbate content lol",
    },
  ])
)};
    

