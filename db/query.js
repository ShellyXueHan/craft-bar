// Connection to db:
const knex = require('./knex');

module.exports = {
  getList: () => {
    return knex('beer')
           .select();
  },
  getBeer: (id) => {
    return knex('beer')
           .select()
           .where('id', id)
           .first();
  },
  create: (beer) => {
    return knex('beer')
           .insert(beer, 'id');
  },
  update: (id, beer) => {
    return knex('beer')
           .where('id', id)
           .update(beer, 'id');
  },
  delete: (id) => {
    return knex('beer')
           .where('id', id)
           .del();
  }
};