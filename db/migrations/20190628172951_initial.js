
exports.up = function(knex, Promise) {
  return Promise.all([
  	knex.schema.createTable('track_my_states_users', function(table) {
  		table.increments('id').primary();
  		table.string('name');
  		table.string('email');
  		table.string('password');

  		table.timestamps(true, true);
  	}),

  	knex.schema.createTable('track_my_states_favorite_states', function(table) {
  		table.increments('id').primary();
  		table.string('state_name');
  		table.integer('number_of_stars');
  		table.boolean('been_to');
  		table.boolean('lived_in');
  		table.boolean('want_to_go');
  		table.integer('user_id').unsigned();
  		table.foreign('user_id')
  			.references('track_my_states_users.id');

  		table.timestamps(true, true);
  	})
  ])
};

exports.down = function(knex) {
  return Promise.all([
  	knex.schema.dropTable('track_my_states_users'),
  	knex.schema.dropTable('track_my_states_favorite_states')
  ]);
};
