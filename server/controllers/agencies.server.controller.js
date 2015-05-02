'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Agency = mongoose.model('Agency'),
	Agent = mongoose.model('Agent'),
	_ = require('lodash');

/**
 * Create an agency
 */
exports.create = function(req, res) {
	var agency = new Agency(req.body);
	agency.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(agency);
		}
	});
};

/**
 * Add an agent
 */
exports.addAgent = function(req, res) {
	var agency = req.agency;
	var agent = new Agent(req.body);
	agent.agency=agency;
	agent.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(agent);
		}
	});
};


/**
 * Show the current agency
 */
exports.read = function(req, res) {
	res.json(req.agency);
};

/**
 * Update an agency
 */
exports.update = function(req, res) {
	var agency = req.agency;

	agency = _.extend(agency, req.body);

	agency.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(agency);
		}
	});
};

/**
 * Delete an agency
 */
exports.delete = function(req, res) {
	var agency = req.agency;

	agency.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(agency);
		}
	});
};

/**
 * List of Agencies
 */
exports.list = function(req, res) {
	Agency.find().sort('-created').exec(function(err, agencies) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(agencies);
		}
	});
};

/**
 * Agency middleware
 */
exports.agencyByID = function(req, res, next, id) {
	Agency.findById(id).exec(function(err, agency) {
		if (err) return next(err);
		if (!agency) return next(new Error('Failed to load agency ' + id));
		req.agency = agency;
		next();
	});
};

/**
 * Agency authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (false) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
