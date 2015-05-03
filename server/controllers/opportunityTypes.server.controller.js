'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	OpportunityType = mongoose.model('OpportunityType'),
	_ = require('lodash');

/**
 * Create an agency
 */
exports.create = function(req, res) {
	var opportunityType = new OpportunityType(req.body);
	opportunityType.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(opportunityType);
		}
	});
};



exports.read = function(req, res) {
	res.json(req.opportunityType);
};

exports.update = function(req, res) {
	var opportunityType = req.opportunityType;

	opportunityType = _.extend(opportunityType, req.body);

	opportunityType.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(opportunityType);
		}
	});
};

exports.delete = function(req, res) {
	var opportunityType = req.opportunityType;

	opportunityType.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(opportunityType);
		}
	});
};

exports.list = function(req, res) {
	OpportunityType.find().sort('-created').exec(function(err, opportunityTypes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(opportunityTypes);
		}
	});
};

/**
 * middleware
 */
 exports.opportunityTypeByID = function(req, res, next, id) {
	OpportunityType.findById(id).exec(function(err, opportunityType) {
		if (err) return next(err);
		if (!opportunityType) return next(new Error('Failed to load opportunityType ' + id));
		req.opportunityType = opportunityType;
		next();
	});
};

/**
 * opportunityType authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (false) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
