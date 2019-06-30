const mockUsers = [
	{
		'name': 'Alvin',
		'email': 'alvin@chipmunks.com',
		'password': 'password1',
	},
	{
		'name': 'Simon',
		'email': 'simon@chipmunks.com',
		'password': 'password2',
	},
	{
		'name': 'Theodore',
		'email': 'theodore@chipmunks.com',
		'password': 'password3',
	}
]

const mockFavoriteStates = [
	{
		'state_name': 'Minnesota',
		'number_of_stars': 0,
		'been_to': false,
		'lived_in': false,
		'want_to_go': true,
	},
	{
		'state_name': 'California',
		'number_of_stars': 4,
		'been_to': true,
		'lived_in': true,
		'want_to_go': false,
	},
	{
		'state_name': 'Colorado',
		'number_of_stars': 3,
		'been_to': true,
		'lived_in': true,
		'want_to_go': false,
	}	
];

module.exports = {
	'mockUsers': mockUsers,
	'mockFavoriteStates': mockFavoriteStates
};