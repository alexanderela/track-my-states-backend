const seedData = require('../../../utils/seedMocks.js');

const createUsers = (knex, user) => {

}

const createFavorite = (knex, favorite) => {
  return knex('track_my_states_favorite_states').insert(favorite)
}

exports.seed = function(knex, Promise) {
  const { mockUsers, mockFavoriteStates } = seedData;


  return knex('track_my_states_favorite_states').del()
    .then(() => knex('track_my_states_users').del())
    .then(() => {
      let userPromises = mockUsers.map(user => {
        return createUsers(knex, user);
      })

      return knex('table_name').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ]);
    });
};
