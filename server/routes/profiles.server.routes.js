'use strict';

/**
 * Module dependencies.
 */
var users = require('../controllers/users.server.controller'),
	profiles= require('../controllers/profiles.server.controller'),
	opportunities= require('../controllers/opportunities.server.controller');

module.exports = function(app) {
	app.route('/profiles')
		.get(profiles.list)
		.post(users.requiresLogin, profiles.create);

	app.route('/profiles/:profileId/opportunities')
		.get(opportunities.listByProfile)
		.post(users.requiresLogin, profiles.hasAuthorization,profiles.addOpportunity);

	app.route('/profiles/:profileId')
		.get(profiles.read)
		.put(users.requiresLogin, profiles.hasAuthorization, profiles.update)
		.delete(users.requiresLogin, profiles.hasAuthorization, profiles.delete);

	// Finish by binding the agency middleware
	app.param('profileId', profiles.profileByID);
	
};