'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	User = mongoose.model('User'),
	Opportunity = mongoose.model('Opportunity'),
	Task = mongoose.model('Task'),
	Note = mongoose.model('Note'),
	Email = mongoose.model('Email'),
	_ = require('lodash');

exports.create = function(req, res) {
	var user = new User(req.body);
	user.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(user);
		}
	});
};

/**
 * Add an opportunity
 */
exports.addOpportunity = function(req, res) {
	var opportunity = new Opportunity(req.body);
	opportunity.user=req.profile;
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
 * Add a Task
 */
exports.addTask = function(req, res) {
	var task = new Task(req.body);
	task.user=req.profile;
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
 * Add a Note
 */
exports.addNote = function(req, res) {
	var note = new Note(req.body);
	note.user=req.profile;
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
 * Add an Email
 */
exports.addEmail = function(req, res) {
	var email = new Email(req.body);
	email.user=req.profile;
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

exports.read = function(req, res) {
	res.json(req.profile);
};


exports.update = function(req, res) {
	var profile = req.profile;

	profile = _.extend(profile, req.body);

	profile.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(profile);
		}
	});
};


exports.delete = function(req, res) {
	var profile = req.profile;

	profile.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(profile);
		}
	});
};

exports.list = function(req, res) {
	User.find().sort('-userName').exec(function(err, profiles) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(profiles);
		}
	});
};

exports.profileByID = function(req, res, next, id) {
	User.findById(id).exec(function(err, profile) {
		if (err) return next(err);
		if (!profile) return next(new Error('Failed to load profile ' + id));
		req.profile = profile;
		next();
	});
};

exports.hasAuthorization = function(req, res, next) {
	if (false) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
