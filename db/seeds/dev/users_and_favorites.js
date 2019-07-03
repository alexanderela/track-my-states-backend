const seedData = require('../../../utils/seedMocks.js');

const createUsers = (knex, user) => {
  return knex('track_my_states_users').insert({

  }, 'id')
  .then(userIds => {
    let favoritePromises = user.favorites.map(favorite => {
      const { 
        state_name, 
        number_of_stars, 
        been_to, 
        lived_in, 
        want_to_go 
      } = favorite;

      return createFavorite(knex, {
        'state_name': state_name,
        'number_of_stars': number_of_stars,
        'been_to': been_to,
        'lived_in': lived_in,
        'want_to_go': want_to_go,
      })
    })

    return Promise.all(favoritePromises)
  })
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

      return Promise.all(userPromises)
    })
    .then(() => console.log('Successfully seeded database!'))
    .catch(error => console.log(`Error seeding database: ${error.message}`))
};