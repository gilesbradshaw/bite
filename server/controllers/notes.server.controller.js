'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Note = mongoose.model('Note'),
	_ = require('lodash');

/**
 * Create a note
 */
exports.create = function(req, res) {
	var note = new Note(req.body);
	note.user = req.user;
	console.log('atricle updating');
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
 * Show the current note
 */
exports.read = function(req, res) {
	res.json(req.note);
};

/**
 * Update a note
 */
exports.update = function(req, res) {
	var note = req.note;

	note = _.extend(note, req.body);

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
 * Delete an note
 */
exports.delete = function(req, res) {
	var note = req.note;

	note.remove(function(err) {
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
 * List of Opportunities
 */
exports.list = function(req, res) {
	Note.find().sort('-created').populate('user', 'displayName').exec(function(err, opportunities) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(opportunities);
		}
	});
};

/**
 * Note middleware
 */
exports.noteByID = function(req, res, next, id) {
	Note.findById(id).populate('user', 'displayName').exec(function(err, note) {
		if (err) return next(err);
		if (!note) return next(new Error('Failed to load note ' + id));
		req.note = note;
		next();
	});
};

/**
 * Note authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.note.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
