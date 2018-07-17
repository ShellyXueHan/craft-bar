exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('admin').del()
    .then(function () {
      const admins = [{
        username: 'Boss',
        password: '123456'
      }, {
        username: 'Employee',
        password: '123456'
      }];
      return knex('admin').insert(admins);
    });
};