'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	OpportunityStatus = mongoose.model('OpportunityStatus'),
	_ = require('lodash');

/**
 * Create an agency
 */
exports.create = function(req, res) {
	var opportunityStatus = new OpportunityStatus(req.body);
	opportunityStatus.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(opportunityStatus);
		}
	});
};



exports.read = function(req, res) {
	res.json(req.opportunityStatus);
};

exports.update = function(req, res) {
	var opportunityStatus = req.opportunityStatus;

	opportunityStatus = _.extend(opportunityStatus, req.body);

	opportunityStatus.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(opportunityStatus);
		}
	});
};

exports.delete = function(req, res) {
	var opportunityStatus = req.opportunityStatus;

	opportunityStatus.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(opportunityStatus);
		}
	});
};

exports.list = function(req, res) {
	OpportunityStatus.find().sort('-created').exec(function(err, opportunityStatuss) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(opportunityStatuss);
		}
	});
};

/**
 * middleware
 */
 exports.opportunityStatusByID = function(req, res, next, id) {
	OpportunityStatus.findById(id).exec(function(err, opportunityStatus) {
		if (err) return next(err);
		if (!opportunityStatus) return next(new Error('Failed to load opportunityStatus ' + id));
		req.opportunityStatus = opportunityStatus;
		next();
	});
};

/**
 * opportunityStatus authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (false) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
