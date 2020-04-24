
exports.seed = function(knex) {
    // Deletes ALL existing entries and resets ids
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'test', password: 'test'},
        {id: 2, username: 'test2', password: 'test2'},
        {id: 3, username: 'test3', password: 'test3'}
      ]);
    });
};
