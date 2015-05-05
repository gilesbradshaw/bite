'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var OpportunitySchema = new Schema({
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
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	type: {
		type: Schema.ObjectId,
		ref: 'OpportunityType'
	},
	status: {
		type: Schema.ObjectId,
		ref: 'OpportunityStatus'
	},
	ratePeriod: {
		type: Schema.ObjectId,
		ref: 'OpportunityRatePeriod'
	},
	agentRating: {
		type: Schema.ObjectId,
		ref: 'OpportunityAgentRating'
	}
});

mongoose.model('Opportunity', OpportunitySchema);