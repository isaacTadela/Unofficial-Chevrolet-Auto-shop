const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'This field is required.'
    },
	vehicle: {
        type: String,
        required: 'This field is required.'
    },
	treatment: {
        type: String,
    },
	cost: {
        type: Number,
		required: 'This field is required and must be a number.'
    },
	created_at: {
        type: Date,
		default: Date.now
    },
    mobile: {
        type: Number,
		required: 'This field is required and must be a number.'
    },
	email: {
        type: String
    },    
    city: {
        type: String
    }
});

// Custom validation for email
employeeSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

employeeSchema.pre('save', function(next){
    now = new Date(Date.now);
    this.updated_at = now.toDateString() ;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

mongoose.model('Employee', employeeSchema);
