'use strict';

/**
 * Module dependencies.
 */
var users = require('../controllers/users.server.controller'),
	opportunities = require('../controllers/opportunities.server.controller'),
	tasks= require('../controllers/tasks.server.controller'),
	notes= require('../controllers/notes.server.controller');

module.exports = function(app) {
	// Opportunity Routes
	app.route('/opportunities')
		.get(opportunities.list)
		.post(users.requiresLogin, opportunities.create);

	app.route('/opportunities/:opportunityId/tasks')
		.get(tasks.listByOpportunity)
		.post(users.requiresLogin, opportunities.hasAuthorization,opportunities.addTask);

	app.route('/opportunities/:opportunityId/notes')
		.get(notes.listByOpportunity)
		.post(users.requiresLogin, opportunities.hasAuthorization,opportunities.addNote);

	app.route('/opportunities/:opportunityId')
		.get(opportunities.read)
		.put(users.requiresLogin, opportunities.hasAuthorization, opportunities.update)
		.delete(users.requiresLogin, opportunities.hasAuthorization, opportunities.delete);

	// Finish by binding the opportunity middleware
	app.param('profileId', opportunities.opportunitiesByProfileID);
	app.param('opportunityId', opportunities.opportunityByID);
};