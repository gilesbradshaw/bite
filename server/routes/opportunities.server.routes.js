'use strict';

/**
 * Module dependencies.
 */
var users = require('../controllers/users.server.controller'),
	opportunities = require('../controllers/opportunities.server.controller');

module.exports = function(app) {
	// Opportunity Routes
	app.route('/opportunities')
		.get(opportunities.list)
		.post(users.requiresLogin, opportunities.create);

	app.route('/opportunities/:opportunityId')
		.get(opportunities.read)
		.put(users.requiresLogin, opportunities.hasAuthorization, opportunities.update)
		.delete(users.requiresLogin, opportunities.hasAuthorization, opportunities.delete);

	// Finish by binding the opportunity middleware
	app.param('opportunityId', opportunities.opportunityByID);
};