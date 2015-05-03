'use strict';

/**
 * Module dependencies.
 */
var users = require('../controllers/users.server.controller'),
	profiles= require('../controllers/profiles.server.controller'),
	opportunities= require('../controllers/opportunities.server.controller'),
	tasks= require('../controllers/tasks.server.controller'),
	notes= require('../controllers/notes.server.controller'),
	emails= require('../controllers/emails.server.controller');

module.exports = function(app) {
	app.route('/profiles')
		.get(profiles.list)
		.post(users.requiresLogin, profiles.create);

	app.route('/profiles/:profileId/opportunities')
		.get(opportunities.listByProfile)
		.post(users.requiresLogin, profiles.hasAuthorization,profiles.addOpportunity);

	app.route('/profiles/:profileId/tasks')
		.get(tasks.listByProfile)
		.post(users.requiresLogin, profiles.hasAuthorization,profiles.addTask);

	app.route('/profiles/:profileId/notes')
		.get(notes.listByProfile)
		.post(users.requiresLogin, profiles.hasAuthorization,profiles.addNote);

	app.route('/profiles/:profileId/emails')
		.get(emails.listByProfile)
		.post(users.requiresLogin, profiles.hasAuthorization,profiles.addEmail);



	app.route('/profiles/:profileId')
		.get(profiles.read)
		.put(users.requiresLogin, profiles.hasAuthorization, profiles.update)
		.delete(users.requiresLogin, profiles.hasAuthorization, profiles.delete);

	// Finish by binding the agency middleware
	app.param('profileId', profiles.profileByID);
	
};