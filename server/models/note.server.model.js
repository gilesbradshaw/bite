'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var NoteSchema = new Schema({
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
	opportunity: {
		type: Schema.ObjectId,
		ref: 'Opportunity'
	}
});

mongoose.model('Note', NoteSchema);