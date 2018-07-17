/**
 * A beer could have:
 * name - String
 * brewery - Stirng
 * type - int
 * price - double
 * 
 * rank - int
 * 
 * alchoho percentage - double
 * color - int
 * ???
 **/

exports.up = function(knex, Promise) {
  return knex.schema.createTable('beer', (table) => {
    table.increments();
    table.text('name').notNullable();
    table.text('brewery').notNullable();
    table.integer('type').notNullable();
    table.integer('price');
    // table.text('description');
    // table.integer('rank');
    // table.integer('alcpercent');
    // table.integer('color');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('beer');
};
