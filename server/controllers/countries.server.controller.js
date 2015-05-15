'use strict';

/**
 * Module dependencies.
 */
import mongoose from 'mongoose';
import errorHandler from './errors.server.controller';
var Country = mongoose.model('Country');
import _ from 'lodash';

/**
 * Create an agency
 */
exports.create = function(req, res) {
	var country = new Country(req.body);
	country.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(country);
		}
	});
};

exports.read = function(req, res) {
	res.json(req.country);
};

/**
 * Update an agency
 */
exports.update = function(req, res) {
	var country = req.country;

	country = _.extend(country, req.body);

	country.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(country);
		}
	});
};

exports.delete = function(req, res) {
	var country = req.country;

	country.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(country);
		}
	});
};

exports.list = function(req, res) {
	Country.find().sort('-created').exec(function(err, countries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(countries);
		}
	});
};

exports.countryByID = function(req, res, next, id) {
	Country.findById(id).exec(function(err, country) {
		if (err) return next(err);
		if (!country) return next(new Error('Failed to load country ' + id));
		req.country = country;
		next();
	});
};

exports.countryByCountryCode = function(req, res, next, countryCode) {
	Country.findOne({countryCode}).exec(function(err, country) {
		if (err) return next(err);
		if (!country) return next(new Error('Failed to load country ' + countryCode));
		req.country = country;
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
