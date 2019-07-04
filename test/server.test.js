const environment = process.env.NODE_ENV || 'development'

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../server');
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

chai.use(chaiHttp)

describe('server.js', () => {
	describe('GET /api/v1/users', () => {
		it('should return all the users in the DB', async () => {
			const expectedUsers = database('track_my_states_users').select()
			const result = await request(app).get('/api/v1/users')
			const users = result.body
			expect(users).toEqual(expectedUsers)
		})
	})
})

// GET View all users
// POST Log user in
// POST Add new user
// GET View all favorite states for particular user
// DELETE Delete state from particular user's favorites list