
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('roles').del(), 

    // Inserts seed entries
    knex('roles').insert({id: 1, role: 'admin'})
  );
};
