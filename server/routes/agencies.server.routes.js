'use strict';

/**
 * Module dependencies.
 */
var users = require('../controllers/users.server.controller'),
	agencies= require('../controllers/agencies.server.controller');

module.exports = function(app) {
	// Agency Routes
	app.route('/agencies')
		.get(agencies.list)
		.post(users.requiresLogin, agencies.create);

	app.route('/agencies/:agencyId/agents')
		.post(users.requiresLogin, agencies.hasAuthorization,agencies.addAgent);

	app.route('/agencies/:agencyId')
		.get(agencies.read)
		.put(users.requiresLogin, agencies.hasAuthorization, agencies.update)
		.delete(users.requiresLogin, agencies.hasAuthorization, agencies.delete);

	// Finish by binding the agency middleware
	app.param('agencyId', agencies.agencyByID);
	
};