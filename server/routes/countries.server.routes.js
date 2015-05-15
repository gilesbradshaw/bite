'use strict';

/**
 * Module dependencies.
 */
var users = require('../controllers/users.server.controller'),
	countries= require('../controllers/countries.server.controller');

module.exports = function(app) {
	// Agency Routes
	app.route('/countries')
		.get(countries.list)
		.post(users.requiresLogin, countries.create);

	app.route('/countries/:countryCode')
		.get(countries.read)
		.put(users.requiresLogin, countries.hasAuthorization, countries.update)
		.delete(users.requiresLogin, countries.hasAuthorization, countries.delete);

	// Finish by binding the agency middleware
	app.param('countryCode', countries.countryByCountryCode);
	
};