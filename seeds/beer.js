
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('beer').del()
    .then(function () {
      const beers = [{
        name: 'beer1',
        brewery: 'red house',
        type: 1,
        price: 15,
        rank: null,
        alcpercent: 10,
        color: 1
      }, {
        name: 'beer2',
        brewery: 'blue house',
        type: 2,
        price: 23,
        rank: null,
        alcpercent: 10,
        color: 1
      }, {
        name: 'beer3',
        brewery: 'yellow house',
        type: 3,
        price: 15,
        rank: null,
        alcpercent: 10,
        color: 1
      }];
      return knex('beer').insert(beers);
    });
};
