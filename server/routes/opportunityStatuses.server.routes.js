'use strict';

/**
 * Module dependencies.
 */
var users = require('../controllers/users.server.controller'),
	opportunityStatuses= require('../controllers/opportunityStatuses.server.controller');

module.exports = function(app) {
	// Agency Routes
	app.route('/opportunityStatuses')
		.get(opportunityStatuses.list)
		.post(users.requiresLogin,opportunityStatuses.create);

	app.route('/opportunityStatuses/:opportunityStatusId')
		.get(opportunityStatuses.read)
		.put(users.requiresLogin, opportunityStatuses.hasAuthorization, opportunityStatuses.update)
		.delete(users.requiresLogin, opportunityStatuses.hasAuthorization, opportunityStatuses.delete);

	// Finish by binding the agency middleware
	app.param('opportunityStatusId', opportunityStatuses.opportunityStatusByID);
	
};