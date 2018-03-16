
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(), 

    // Inserts seed entries
    knex('users').insert({
      id:1,
      name: "sameer",
      email: "samahm9797@gmail.com", 
      password:"$2a$10$z4FdIYOj8P1j5w.84FyF/uUX6URf9ADm7MfNguLutiWZGCDOueHne",
      role:1
    })
  );
};
