const environment = 'test';

const bodyParser = require('body-parser');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../server');
const configuration = require('../knexfile')['test']
const database = require('knex')(configuration)
const { mockUsers, mockUsersError, mockFavoriteStates, mockFavoriteStatesError } = require('./testMocks');

chai.use(chaiHttp)

describe('Get all users', () => {

		it.skip('should return status of 200 on GET request', async () => {
			chai.request(app)
				.get('/api/v1/users')
				.end((error, response) => {
					expect(response).to.have.status(200)
				})
		})

		it.skip('should return a 404 for a route that does not exist', () => {
			chai.request(app)
				.get('/api/v1/uzerz')
				.end((error, response) => {
					expect(response).to.have.status(404)
					expect(response).to.be.html
				})
		})

		it.skip('should return an array of users', () => {
			chai.request(app)
				.get('/api/v1/users')
				.end((error, response) => {
					expect(response.body.length).to.equal(3)
					expect(response.body[0]).to.be.a('object')
					expect(response.body[1]).to.be.a('object')
					expect(response.body[2]).to.be.a('object')
					expect(response.body[0]).to.have.property('name')
					expect(response.body[1]).to.have.property('email')
					expect(response.body[2]).to.have.property('password')
				})
		})
	})

// GET View all users
// POST Log user in
// POST Add new user
// GET View all favorite states for particular user
// DELETE Delete state from particular user's favorites list