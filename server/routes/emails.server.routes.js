'use strict';

/**
 * Module dependencies.
 */
var users = require('../controllers/users.server.controller'),
	emails = require('../controllers/emails.server.controller');

module.exports = function(app) {
	// Task Routes
	app.route('/emails')
		.get(emails.list)
		.post(users.requiresLogin, emails.create);

	app.route('/emails/:emailId')
		.get(emails.read)
		.put(users.requiresLogin, emails.hasAuthorization, emails.update)
		.delete(users.requiresLogin, emails.hasAuthorization, emails.delete);

	app.route('/opportunities/:opportunityId/emails/:emailId')
		.get(emails.read)
		.put(users.requiresLogin, emails.hasAuthorization, emails.update);


	// Finish by binding the email middleware
	app.param('emailId', emails.emailByID);
	app.param('opportunityId', emails.emailsByOpportunityID);
};