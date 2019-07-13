const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const signup = (request, response) => {
	const user = request.body

	for(let requiredParam of ['email', 'username', 'password']) {
		if(user[requiredParam] === undefined) {
			response.status(422).send({ error: `Missing required parameter: ${requiredParam}`});
			return
		}
	}

	database('track_my_states_users')
		.where('email', user.email)
		.select()
		.then(foundEmail => {
			if(foundEmail.length === 0) {
				encryptPassword(user.password)
					.then(encryptedPassword => {
						delete user.password
						user.password_digest = encryptedPassword
					})
					.then(() => createToken())
					.then(token => user.token = token)
					.then(() => createUser(user))
					.then(user => {
						delete user.password_digest
						response.status(201).json({ user })
					})
			} else {
				response.status(422).send({ error: 'Email Already Exists' });
			}
		})
		.catch(error => {
			response.status(500).json({ error: error.message })
		});
}

module.exports = signup