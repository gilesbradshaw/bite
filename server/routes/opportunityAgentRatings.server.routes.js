'use strict';

/**
 * Module dependencies.
 */
var users = require('../controllers/users.server.controller'),
	opportunityAgentRatings= require('../controllers/opportunityAgentRatings.server.controller');

module.exports = function(app) {
	// Agency Routes
	app.route('/opportunityAgentRatings')
		.get(opportunityAgentRatings.list)
		.post(users.requiresLogin,opportunityAgentRatings.create);

	app.route('/opportunityAgentRatings/:opportunityAgentRatingId')
		.get(opportunityAgentRatings.read)
		.put(users.requiresLogin, opportunityAgentRatings.hasAuthorization, opportunityAgentRatings.update)
		.delete(users.requiresLogin, opportunityAgentRatings.hasAuthorization, opportunityAgentRatings.delete);

	// Finish by binding the agency middleware
	app.param('opportunityAgentRatingId', opportunityAgentRatings.opportunityAgentRatingByID);
	
};