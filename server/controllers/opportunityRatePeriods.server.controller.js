'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	OpportunityRatePeriod = mongoose.model('OpportunityRatePeriod'),
	_ = require('lodash');

/**
 * Create an agency
 */
exports.create = function(req, res) {
	var opportunityRatePeriod = new OpportunityRatePeriod(req.body);
	opportunityRatePeriod.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(opportunityRatePeriod);
		}
	});
};



exports.read = function(req, res) {
	res.json(req.opportunityRatePeriod);
};

exports.update = function(req, res) {
	var opportunityRatePeriod = req.opportunityRatePeriod;

	opportunityRatePeriod = _.extend(opportunityRatePeriod, req.body);

	opportunityRatePeriod.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(opportunityRatePeriod);
		}
	});
};

exports.delete = function(req, res) {
	var opportunityRatePeriod = req.opportunityRatePeriod;

	opportunityRatePeriod.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(opportunityRatePeriod);
		}
	});
};

exports.list = function(req, res) {
	OpportunityRatePeriod.find().sort('-created').exec(function(err, opportunityRatePeriods) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(opportunityRatePeriods);
		}
	});
};

/**
 * middleware
 */
 exports.opportunityRatePeriodByID = function(req, res, next, id) {
	OpportunityRatePeriod.findById(id).exec(function(err, opportunityRatePeriod) {
		if (err) return next(err);
		if (!opportunityRatePeriod) return next(new Error('Failed to load opportunityRatePeriod ' + id));
		req.opportunityRatePeriod = opportunityRatePeriod;
		next();
	});
};

/**
 * opportunityRatePeriod authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (false) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
