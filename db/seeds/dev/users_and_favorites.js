const seedData = require('../../../utils/seedMocks.js');

const createUsers = (knex, user) => {
  const { name, email, password } = user;

  return knex('track_my_states_users').insert({
    'name': name,
    'email': email,
    'password': password,
  }, 'id')
  .then(userIds => {
    let favoritePromises = seedData.mockFavoriteStates.map(mockFav => {
      const { state_name, number_of_stars, been_to, lived_in, want_to_go } = mockFav;

      return createFavorites(knex, {
        'state_name': state_name,
        'number_of_stars': number_of_stars,
        'been_to': been_to,
        'lived_in': lived_in,
        'want_to_go': want_to_go,
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
