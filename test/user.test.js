process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const user = require('../user');
const expect = chai.expect;
const should = chai.should();
const configuration = require('../knexfile')['test'];
const database = require('knex')(configuration)

chai.use(chaiHttp)

describe('User Middleware', () => {
	describe('User Signup', () => {
		it('should return status 201 if a user successfully signs up', done => {
			const userRequest = {
				'username': 'Alvin',
				'password': 'chipmunks',
				'email': 'alvin@chipmunks.com'
			}

			chai
				.request(app)
				.post('/signup')
				.send(userRequest)
				.end((request, response) => {
					response.should.have.status(201)
					response.body.user[0].should.have.property('id')
					response.body.user[0].should.have.property('username')
					response.body.user[0].should.have.property('token')
					done()
				})
		});

		it.skip('should return 422 if request is missing username or password', done => {});

		it.skip('should return 422 if the email already exists', done => {});

		it.skip('should delete the user password and password_digest from the user response', done => {});;
	})

	describe('User login', () => {
		// it.skip('should return status 201 if a user successfully logs in', done => {
		// 	const userRequest = {
		// 		email: 'alvin@chipmunks.com',
		// 		password: 'password1'
		// 	}

		// 	chai.request(app)
		// 		.post('/signin')
		// 		.send(userRequest)
		// 		.end((request, response) => {
		// 			response.should.have.status(201)
		// 			response.body[0].should.have.property('id')
		// 			response.body[0].should.have.property('email')
		// 			response.body[0].should.have.property('token')
		// 		})
		// })

		it.skip('should return 422 if request is missing username or password', done => {});

		it.skip('should return 422 if user does not exist', done => {});

		it.skip('should delete the user password_digest from the user response', done => {});
	})
})