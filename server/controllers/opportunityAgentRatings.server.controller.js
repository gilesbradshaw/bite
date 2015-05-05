'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	OpportunityAgentRating = mongoose.model('OpportunityAgentRating'),
	_ = require('lodash');

/**
 * Create an agency
 */
exports.create = function(req, res) {
	var opportunityAgentRating = new OpportunityAgentRating(req.body);
	opportunityAgentRating.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(opportunityAgentRating);
		}
	});
};



exports.read = function(req, res) {
	res.json(req.opportunityAgentRating);
};

exports.update = function(req, res) {
	var opportunityAgentRating = req.opportunityAgentRating;

	opportunityAgentRating = _.extend(opportunityAgentRating, req.body);

	opportunityAgentRating.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(opportunityAgentRating);
		}
	});
};

exports.delete = function(req, res) {
	var opportunityAgentRating = req.opportunityAgentRating;

	opportunityAgentRating.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(opportunityAgentRating);
		}
	});
};

exports.list = function(req, res) {
	OpportunityAgentRating.find().sort('-created').exec(function(err, opportunityAgentRatings) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(opportunityAgentRatings);
		}
	});
};

/**
 * middleware
 */
 exports.opportunityAgentRatingByID = function(req, res, next, id) {
	OpportunityAgentRating.findById(id).exec(function(err, opportunityAgentRating) {
		if (err) return next(err);
		if (!opportunityAgentRating) return next(new Error('Failed to load opportunityAgentRating ' + id));
		req.opportunityAgentRating = opportunityAgentRating;
		next();
	});
};

/**
 * opportunityAgentRating authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (false) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
