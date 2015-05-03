'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	validators = require('mongoose-validators'),
	Schema = mongoose.Schema;


var OpportunityTypeSchema = new Schema({
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	}});

mongoose.model('OpportunityType', OpportunityTypeSchema);