'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	validators = require('mongoose-validators'),
	Schema = mongoose.Schema;


var OpportunityAgentRatingSchema = new Schema({
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	}});

mongoose.model('OpportunityAgentRating', OpportunityAgentRatingSchema);