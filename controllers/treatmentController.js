const express = require('express');
var router = express.Router();
var moment = require('moment');
const mongoose = require('mongoose');
const Treatment = mongoose.model('treatment');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/',ensureAuthenticated, (req, res) => {
    res.render("treatments/addOrEdit", {
        viewTitle: "Insert a New Treatment"
    });
});

router.post('/',ensureAuthenticated, (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});

function insertRecord(req, res) {
    var treatment = new Treatment();
    treatment.fullName = req.body.fullName;
	treatment.vehicle = req.body.vehicle;
	treatment.treatment = req.body.treatment;
	treatment.cost = req.body.cost;
	treatment.created_at = moment().format('MMMM Do YYYY, h:mm:ss a');
    treatment.mobile = req.body.mobile;
	treatment.email = req.body.email;
    treatment.city = req.body.city;
	
	switch (treatment.vehicle) {
		case 'Colorado':
            treatment.img = "https://elasticbeanstalk-eu-west-3-720322189317.s3.eu-west-3.amazonaws.com/2019-awards-colorado-1.jpg";
            break;
		case 'Cruze':
			treatment.img = "https://elasticbeanstalk-eu-west-3-720322189317.s3.eu-west-3.amazonaws.com/2019-awards-cruze-1.jpg";
			break;
		case 'Equinox':
			treatment.img = "https://elasticbeanstalk-eu-west-3-720322189317.s3.eu-west-3.amazonaws.com/2019-awards-equinox-1.jpg";
			break;
		case 'Impala':
			treatment.img = "https://elasticbeanstalk-eu-west-3-720322189317.s3.eu-west-3.amazonaws.com/2019-awards-impala-1.jpg";
			break;
		case 'Malibu':
			treatment.img = "https://elasticbeanstalk-eu-west-3-720322189317.s3.eu-west-3.amazonaws.com/2019-awards-malibu-1.jpg";
			break;
		case 'Silverado':
			treatment.img = "https://elasticbeanstalk-eu-west-3-720322189317.s3.eu-west-3.amazonaws.com/2019-awards-silverado-1.jpg";
			break;
		case 'Suburban':
			treatment.img = "https://elasticbeanstalk-eu-west-3-720322189317.s3.eu-west-3.amazonaws.com/2019-awards-suburban-1.jpg";
			break;
		case 'Tahoe':
			treatment.img = "https://elasticbeanstalk-eu-west-3-720322189317.s3.eu-west-3.amazonaws.com/2019-awards-tahoe-1.jpg";
			break;
		case 'Traverse':
			treatment.img = "https://elasticbeanstalk-eu-west-3-720322189317.s3.eu-west-3.amazonaws.com/2019-awards-traverse-1.jpg";
			break;
		case 'Trax':
			treatment.img = "https://elasticbeanstalk-eu-west-3-720322189317.s3.eu-west-3.amazonaws.com/2019-awards-trax-1.jpg";
			break;
		default:
			treatment.img = "https://elasticbeanstalk-eu-west-3-720322189317.s3.eu-west-3.amazonaws.com/Chevrolet-logo1.png";
			break;
    }
	
    treatment.save((err, doc) => {
        if (!err)
            res.redirect('treatments/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("treatments/addOrEdit", {
                    viewTitle: "Insert a New Treatment",
                    treatment: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
	
	switch (req.body.vehicle) {
		case 'Colorado':
            req.body.img = "https://elasticbeanstalk-eu-west-3-720322189317.s3.eu-west-3.amazonaws.com/2019-awards-colorado-1.jpg";
            break;
		case 'Cruze':
			req.body.img = "https://elasticbeanstalk-eu-west-3-720322189317.s3.eu-west-3.amazonaws.com/2019-awards-cruze-1.jpg";
			break;
		case 'Equinox':
			req.body.img = "https://elasticbeanstalk-eu-west-3-720322189317.s3.eu-west-3.amazonaws.com/2019-awards-equinox-1.jpg";
			break;
		case 'Impala':
			req.body.img = "https://elasticbeanstalk-eu-west-3-720322189317.s3.eu-west-3.amazonaws.com/2019-awards-impala-1.jpg";
			break;
		case 'Malibu':
			req.body.img = "https://elasticbeanstalk-eu-west-3-720322189317.s3.eu-west-3.amazonaws.com/2019-awards-malibu-1.jpg";
			break;
		case 'Silverado':
			req.body.img = "https://elasticbeanstalk-eu-west-3-720322189317.s3.eu-west-3.amazonaws.com/2019-awards-silverado-1.jpg";
			break;
		case 'Suburban':
			req.body.img = "https://elasticbeanstalk-eu-west-3-720322189317.s3.eu-west-3.amazonaws.com/2019-awards-suburban-1.jpg";
			break;
		case 'Tahoe':
			req.body.img = "https://elasticbeanstalk-eu-west-3-720322189317.s3.eu-west-3.amazonaws.com/2019-awards-tahoe-1.jpg";
			break;
		case 'Traverse':
			req.body.img = "https://elasticbeanstalk-eu-west-3-720322189317.s3.eu-west-3.amazonaws.com/2019-awards-traverse-1.jpg";
			break;
		case 'Trax':
			req.body.img = "https://elasticbeanstalk-eu-west-3-720322189317.s3.eu-west-3.amazonaws.com/2019-awards-trax-1.jpg";
			break;
		default:
			req.body.img = "https://elasticbeanstalk-eu-west-3-720322189317.s3.eu-west-3.amazonaws.com/Chevrolet-logo1.png";
			break;
    }
	
    Treatment.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
		
	if (!err) { 
		
        res.redirect('treatments/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("treatments/addOrEdit", {
                    viewTitle: 'Update Treatments',
                    treatments: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
     }
    });
}

router.get('/list',ensureAuthenticated, (req, res) => {
    Treatment.find((err, docs) => {
        if (!err) {
            res.render("treatments/list", {
                viewTitle: "Treatments List" ,
				list: docs
            });
        }
        else {
            console.log('Error in retrieving treatments list :' + err);
        }
    }).lean();
});

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
			case 'vehicle':
                body['vehicleError'] = err.errors[field].message;
                break;
			case 'cost':
                body['costError'] = err.errors[field].message;
                break;
			case 'mobile':
                body['mobileError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
				body['generalError'] = err.errors[field].message;
                break;
        }
    }
}

router.get('/:id',ensureAuthenticated, (req, res) => {
    Treatment.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("treatments/addOrEdit", {
                viewTitle: "Update Treatment",
                treatment: doc
            });
        }
    });
});

router.get('/delete/:id',ensureAuthenticated, (req, res) => {
    Treatment.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/treatments/list');
        }
        else { console.log('Error in delete treatment:' + err); }
    });
});

module.exports = router;

