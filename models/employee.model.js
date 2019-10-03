const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'This field is required.',
		trim: true
    },
	vehicle: {
        type: String,
        required: 'This field is required.',
		trim: true
    },
	treatment: {
        type: String,
		trim: true
    },
	cost: {
        type: Number,
		required: 'This field is required and must be a number.',
		trim: true
    },
	created_at: {
        type: String,
		//default: Date.now,
		trim: true
    },
    mobile: {
        type: Number,
		required: 'This field is required and must be a number.',
		trim: true
    },
	email: {
        type: String,
		trim: true
    },    
    city: {
        type: String,
		trim: true
    },
	img: {
        type: String,
		//trim: true
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
