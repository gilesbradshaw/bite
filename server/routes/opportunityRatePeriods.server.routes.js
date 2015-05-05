'use strict';

/**
 * Module dependencies.
 */
var users = require('../controllers/users.server.controller'),
	opportunityRatePeriods= require('../controllers/opportunityRatePeriods.server.controller');

module.exports = function(app) {
	// Agency Routes
	app.route('/opportunityRatePeriods')
		.get(opportunityRatePeriods.list)
		.post(users.requiresLogin,opportunityRatePeriods.create);

	app.route('/opportunityRatePeriods/:opportunityRatePeriodId')
		.get(opportunityRatePeriods.read)
		.put(users.requiresLogin, opportunityRatePeriods.hasAuthorization, opportunityRatePeriods.update)
		.delete(users.requiresLogin, opportunityRatePeriods.hasAuthorization, opportunityRatePeriods.delete);

	// Finish by binding the agency middleware
	app.param('opportunityRatePeriodId', opportunityRatePeriods.opportunityRatePeriodByID);
	
};