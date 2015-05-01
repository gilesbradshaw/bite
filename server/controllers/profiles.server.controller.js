'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	User = mongoose.model('User'),
	Opportunity = mongoose.model('Opportunity'),
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
