'use strict';

/**
 * Module dependencies.
 */
var users = require('../controllers/users.server.controller'),
	agents= require('../controllers/agents.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/agents')
		.get(agents.list)
		.post(users.requiresLogin, agents.create);

	app.route('/agents/:agentId')
		.get(agents.read)
		.put(users.requiresLogin, agents.hasAuthorization, agents.update)
		.delete(users.requiresLogin, agents.hasAuthorization, agents.delete);
	
	app.route('/agents/agency/:agencyId')
		.get(agents.listByAgency);

	app.route('/agencies/:agencyId/agents/:agentId')
		.get(agents.read)
		.put(users.requiresLogin, agents.hasAuthorization, agents.update);
		
	// Finish by binding the article middleware
	app.param('agencyId', agents.agentsByAgencyID);
	app.param('agentId', agents.agentByID);
};