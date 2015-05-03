'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Opportunity = mongoose.model('Opportunity'),
	Task = mongoose.model('Task'),
	Note = mongoose.model('Note'),
	Email = mongoose.model('Email'),
	_ = require('lodash');

/**
 * Create a opportunity
 */
exports.create = function(req, res) {
	var opportunity = new Opportunity(req.body);
	opportunity.user = req.user;
	console.log('atricle updating');
	opportunity.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(opportunity);
		}
	});
};



/**
 * Add a task
 */
exports.addTask = function(req, res) {
	var task = new Task(req.body);
	task.opportunity=req.opportunity;
	task.user = req.user;
	task.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(task);
		}
	});
};


/**
 * Add a note
 */
exports.addNote = function(req, res) {
	var note = new Note(req.body);
	note.user = req.user;
	if(!req.user)
	{
		ret.gg='kkk';
		throw "nahhhhh";
	}
	note.opportunity=req.opportunity;
	note.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(note);
		}
	});
};

/**
 * Add an email
 */
exports.addEmail = function(req, res) {
	var email = new Email(req.body);
	email.user = req.user;
	email.opportunity=req.opportunity;
	email.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(email);
		}
	});
};
/**
 * Show the current opportunity
 */
exports.read = function(req, res) {
	res.json(req.opportunity);
};

/**
 * Update a opportunity
 */
exports.update = function(req, res) {
	var opportunity = req.opportunity;

	opportunity = _.extend(opportunity, req.body);

	opportunity.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(opportunity);
		}
	});
};

/**
 * Delete an opportunity
 */
exports.delete = function(req, res) {
	var opportunity = req.opportunity;

	opportunity.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(opportunity);
		}
	});
};

/**
 * List of Opportunities
 */
exports.list = function(req, res) {
	Opportunity.find().sort('-created').populate('user', 'displayName').exec(function(err, opportunities) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(opportunities);
		}
	});
};

exports.listByProfile = function(req, res) {
	res.json(req.opportunities);
};

/**
 * Opportunity middleware
 */
exports.opportunityByID = function(req, res, next, id) {
	Opportunity.findById(id).populate('user', 'displayName').exec(function(err, opportunity) {
		if (err) return next(err);
		if (!opportunity) return next(new Error('Failed to load opportunity ' + id));
		req.opportunity = opportunity;
		next();
	});
};


exports.opportunitiesByProfileID = function(req, res, next, id) {
	Opportunity.find({'user':new mongoose.Types.ObjectId(id)}).exec(function(err,opportunities){
		if (err) return next(err);
		if (!opportunities) return next(new Error('Failed to load opportunities for profile ' + id));
		req.opportunities = opportunities;
		next();
	});
	
};
/**
 * Opportunity authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.opportunity.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
