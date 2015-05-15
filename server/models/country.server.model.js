'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	validators = require('mongoose-validators'),
	Schema = mongoose.Schema;


var CountrySchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	countryCode: {
		type: String,
		unique:true,
		default: '',
		trim: true,
		length:2,
		required: 'Country code cannot be blank'
	},
	name: {
		type: String,
		default: '',
		trim: true,
		required: 'Country code cannot be blank'
	}
});

mongoose.model('Country', CountrySchema);