const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json())

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Track My States Backend user.js';





app.listen(app.get('port'), () => {
	console.log(`${app.locals.title} is running on ${app.get('port')}.`)
});

module.exports = app;