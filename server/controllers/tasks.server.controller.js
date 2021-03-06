'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Task = mongoose.model('Task'),
	_ = require('lodash');

/**
 * Create a task
 */
exports.create = function(req, res) {
	var task = new Task(req.body);
	task.user = req.user;
	console.log('atricle updating');
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
 * Show the current task
 */
exports.read = function(req, res) {
	res.json(req.task);
};

/**
 * Update a task
 */
exports.update = function(req, res) {
	var task = req.task;

	task = _.extend(task, req.body);

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
 * Delete an task
 */
exports.delete = function(req, res) {
	var task = req.task;

	task.remove(function(err) {
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
 * List of Opportunities
 */
exports.list = function(req, res) {
	Task.find().sort('-created').populate('user', 'displayName').exec(function(err, opportunities) {
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
	res.json(req.tasks);
};

exports.listByOpportunity = function(req, res) {
	res.json(req.tasks);
};

/**
 * Task middleware
 */
exports.taskByID = function(req, res, next, id) {
	Task.findById(id)
		.populate('user', 'displayName')
		.populate('opportunity', 'title')
		.exec(function(err, task) {
			if (err) return next(err);
			if (!task) return next(new Error('Failed to load task ' + id));
			req.task = task;
			next();
		});
	};

exports.tasksByOpportunityID = function(req, res, next, id) {
	Task.find({'opportunity':new mongoose.Types.ObjectId(id)}).exec(function(err,tasks){
		if (err) return next(err);
		if (!tasks) return next(new Error('Failed to load tasks for opportunity ' + id));
		req.tasks = tasks;
		next();
	});	
};

exports.tasksByProfileID = function(req, res, next, id) {
	Task.find({'user':new mongoose.Types.ObjectId(id)}).exec(function(err,tasks){
		if (err) return next(err);
		if (!tasks) return next(new Error('Failed to load tasks for user ' + id));
		req.tasks = tasks;
		next();
	});	
};

/**
 * Task authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.task.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
