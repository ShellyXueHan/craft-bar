
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('beer').del()
    .then(function () {
      const beers = [{
        name: 'beer1',
        brewery: 'red house',
        type: 1,
        price: 15,
      }, {
        name: 'beer2',
        brewery: 'blue house',
        type: 2,
        price: 23,
      }, {
        name: 'beer3',
        brewery: 'yellow house',
        type: 3,
        price: 15,
      }];
      return knex('beer').insert(beers);
    });
};

// const beers = [{
//   name: 'beer1',
//   brewery: 'red house',
//   type: 1,
//   price: 15,
//   description: 'best beer',
//   rank: 1,
//   alcpercent: 10,
//   color: 1
// }, {
//   name: 'beer2',
//   brewery: 'blue house',
//   type: 2,
//   price: 23,
//   description: 'best beer',
//   rank: 2,
//   alcpercent: 10,
//   color: 1
// }, {
//   name: 'beer3',
//   brewery: 'yellow house',
//   type: 3,
//   price: 15,
//   description: 'best beer',
//   rank: 3,
//   alcpercent: 10,
//   color: 1
// }];