'use strict';

/**
 * Module dependencies.
 */
var users = require('../controllers/users.server.controller'),
	tasks = require('../controllers/tasks.server.controller');

module.exports = function(app) {
	// Task Routes
	app.route('/tasks')
		.get(tasks.list)
		.post(users.requiresLogin, tasks.create);

	app.route('/tasks/:taskId')
		.get(tasks.read)
		.put(users.requiresLogin, tasks.hasAuthorization, tasks.update)
		.delete(users.requiresLogin, tasks.hasAuthorization, tasks.delete);

	app.route('/opportunities/:opportunityId/tasks/:taskId')
		.get(tasks.read)
		.put(users.requiresLogin, tasks.hasAuthorization, tasks.update);


	// Finish by binding the task middleware
	app.param('taskId', tasks.taskByID);
	app.param('opportunityId', tasks.tasksByOpportunityID);
};