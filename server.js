const bodyParser = require('body-parser');
const express = require('express');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json())

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Track My States Backend';

app.get('/api/v1/users', (request, response) => {
	database('track_my_states_users').select()
		.then((users) => {
			response.status(200).json(users);
		})
		.catch((error) => {
			response.status(500).json({ error: error.message });
		});
});

app.listen(app.get('port'), () => {
	console.log(`${app.locals.title} is running on ${app.get('port')}.`)
});

module.exports = app;