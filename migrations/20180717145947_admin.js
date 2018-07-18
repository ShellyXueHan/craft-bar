
/**
 * User table is for employees on admin portal use only:
 *  - username
 *  - password
 */
exports.up = function(knex, Promise) {
  return knex.schema.createTable('admin', (table) => {
    table.increments();
    table.text('username');
    table.text('password');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('admin');
};
