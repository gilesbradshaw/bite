'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Agent = mongoose.model('Agent'),
	_ = require('lodash');

/**
 * Create an agent
 */
exports.create = function(req, res) {
	var agent = new Agent(req.body);
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
 * Show the current agent
 */
exports.read = function(req, res) {
	res.json(req.agent);
};

/**
 * Update an agent
 */
exports.update = function(req, res) {
	var agent = req.agent;

	agent = _.extend(agent, req.body);

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
 * Delete an agent
 */
exports.delete = function(req, res) {
	var agent = req.agent;

	agent.remove(function(err) {
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
 * List of Agents
 */
exports.list = function(req, res) {
	Agent.find().sort('-created').exec(function(err, agents) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(agents);
		}
	});
};

exports.listByAgency = function(req, res) {
	res.json(req.agents);
};

/**
 * Agent middleware
 */
exports.agentByID = function(req, res, next, id) {
	Agent.findById(id).exec(function(err, agent) {
		if (err) return next(err);
		if (!agent) return next(new Error('Failed to load agent ' + id));
		req.agent = agent;
		next();
	});
};

exports.agentsByAgencyID = function(req, res, next, id) {
	Agent.find({'agency':new mongoose.Types.ObjectId(id)}).exec(function(err,agents){
		if (err) return next(err);
		if (!agents) return next(new Error('Failed to load agents for agency ' + id));
		req.agents = agents;
		next();
	});
	
};

/**
 * Agent authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (false) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
