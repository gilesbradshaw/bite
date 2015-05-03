'use strict';

/**
 * Module dependencies.
 */
var users = require('../controllers/users.server.controller'),
	opportunityTypes= require('../controllers/opportunityTypes.server.controller');

module.exports = function(app) {
	// Agency Routes
	app.route('/opportunityTypes')
		.get(opportunityTypes.list)
		.post(users.requiresLogin,opportunityTypes.create);

	app.route('/opportunityTypes/:opportunityTypeId')
		.get(opportunityTypes.read)
		.put(users.requiresLogin, opportunityTypes.hasAuthorization, opportunityTypes.update)
		.delete(users.requiresLogin, opportunityTypes.hasAuthorization, opportunityTypes.delete);

	// Finish by binding the agency middleware
	app.param('opportunityTypeId', opportunityTypes.opportunityTypeByID);
	
};