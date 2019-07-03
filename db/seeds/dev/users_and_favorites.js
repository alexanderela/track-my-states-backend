const seedData = require('../../../utils/seedMocks.js');

const createUsers = (knex, user) => {
  return knex('track_my_states_users').insert({
    'name': user.name,
    'email': user.email,
    'password': user.password,
  }, 'id')
  .then(userIds => {
    let favoritePromises = seedData.mockFavoriteStates.map(mockFav => {
      return createFavorites(knex, {
        'state_name': mockFav.state_name,
        'number_of_stars': mockFav.number_of_stars,
        'been_to': mockFav.been_to,
        'lived_in': mockFav.lived_in,
        'want_to_go': mockFav.want_to_go,
        'user_id': userIds[0]
      })
    })
    return Promise.all(favoritePromises)
  })
}

const createFavorites = (knex, favorite) => {
  return knex('track_my_states_favorite_states').insert(favorite)
}

exports.seed = function(knex) {
  return knex('track_my_states_favorite_states').del()
    .then(() => knex('track_my_states_users').del())
    .then(() => {
      let userPromises = seedData.mockUsers.map(mockUser => {
        return createUsers(knex, mockUser)
      })
      return Promise.all(userPromises)
    })
    .then(() => console.log('Successfully seeded database!'))
    .catch(error => console.log(`Error seeding database: ${error.message}`))
};
