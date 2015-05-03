'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Email = mongoose.model('Email'),
	_ = require('lodash');

/**
 * Create a email
 */
exports.create = function(req, res) {
	var email = new Email(req.body);
	email.user = req.user;
	console.log('atricle updating');
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
 * Show the current email
 */
exports.read = function(req, res) {
	res.json(req.email);
};

/**
 * Update a email
 */
exports.update = function(req, res) {
	var email = req.email;

	email = _.extend(email, req.body);
	email.user=req.user;
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
 * Delete an email
 */
exports.delete = function(req, res) {
	var email = req.email;

	email.remove(function(err) {
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
 * List of Opportunities
 */
exports.list = function(req, res) {
	Email.find().sort('-created').populate('user', 'displayName').exec(function(err, opportunities) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(opportunities);
		}
	});
};


exports.listByOpportunity = function(req, res) {
	res.json(req.emails);
};

exports.listByProfile = function(req, res) {
	res.json(req.emails);
};


/**
 * Email middleware
 */
exports.emailByID = function(req, res, next, id) {
	Email.findById(id).populate('user', 'displayName').exec(function(err, email) {
		if (err) return next(err);
		if (!email) return next(new Error('Failed to load email ' + id));
		req.email = email;
		next();
	});
};

exports.emailsByOpportunityID = function(req, res, next, id) {
	Email.find({'opportunity':new mongoose.Types.ObjectId(id)}).exec(function(err,emails){
		if (err) return next(err);
		if (!emails) return next(new Error('Failed to load emails for opportunity ' + id));
		req.emails = emails;
		next();
	});	
};
exports.emailsByProfileID = function(req, res, next, id) {
	Email.find({'user':new mongoose.Types.ObjectId(id)}).exec(function(err,emails){
		if (err) return next(err);
		if (!emails) return next(new Error('Failed to load emails for user ' + id));
		req.emails = emails;
		next();
	});	
};


/**
 * Email authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if(!req.email.user){
		return res.status(403).send({
			message: 'Email has no user!!!'
		});
	}

	if (req.email.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
