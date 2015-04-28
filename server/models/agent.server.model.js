'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
validators = require('mongoose-validators'),
	Schema = mongoose.Schema;

/**
 * Agent Schema
 */
var AgentSchema = new Schema({
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
	 email: {
        type: String,
        trim: true,
        validate:validators.isEmail({
			skipNull:true,
			skipEmpty:true,
			message:'Please enter a valid email address'
		})
    },
    urls:[
	    {
	    	name:{ 
	    		type:String, 
	    		required:'Url name cannot be blank'
	    	},
	    	url: {
				type: String,
				default: '',
				trim: true,
				validate:validators.isURL({
					skipNull:true,
					skipEmpty:true,
					message:'Please enter a valid url'
				})
			}
	    }
    ],
    agency:
    	{ 
    		type : mongoose.Schema.ObjectId, 
    		ref : 'Agency' 
    	}

});

mongoose.model('Agent', AgentSchema);