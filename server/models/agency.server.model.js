'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	validators = require('mongoose-validators'),
	Schema = mongoose.Schema;

/**
 * AgencySchema
 */
var AgencySchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	website: {
		type: String,
		default: '',
		trim: true,
		validate:validators.isURL({
			skipNull:true,
			skipEmpty:true,
			message:'Please enter a valid url'
		})
	}
});

mongoose.model('Agency', AgencySchema);