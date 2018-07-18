
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('beer').del()
    .then(function () {
      const beers = [{
        name: '1792 english ale',
        brewery: 'Sons Of Kent',
        type: 1,
        price: 15,
      }, {
        name: 'camerons cosmic cream ale',
        brewery: 'Camerons Brewing Company',
        type: 1,
        price: 23,
      }, {
        name: 'flying monkeys amber ale',
        brewery: 'Flying Monkeys Craft Brewery',
        type: 1,
        price: 25,
      }, {
        name: 'budweiser',
        brewery: 'Labatt',
        type: 2,
        price: 13,
      }, {
        name: 'carlsberg',
        brewery: 'Carlsberg International A/S',
        type: 2,
        price: 33,
      }, {
        name: 'corona extra',
        brewery: 'Cerveceria Modelo S.A. De C.V.',
        type: 2,
        price: 25,
      }, {
        name: 'belhaven black scot stout',
        brewery: 'Greene King Plc',
        type: 3,
        price: 12,
      }, {
        name: 'guinness pub draught',
        brewery: 'Diageo',
        type: 3,
        price: 15,
      }, {
        name: 'wellington imperial stout',
        brewery: 'Wellington County',
        type: 3,
        price: 23,
      }, {
        name: 'poppers pink',
        brewery: 'Brew Alliance',
        type: 4,
        price: 22,
      }, {
        name: 'mad jack',
        brewery: 'Molson',
        type: 4,
        price: 18,
      }, {
        name: 'rickards radler',
        brewery: 'Molson',
        type: 4,
        price: 15,
      }];
      return knex('beer').insert(beers);
    });
};
