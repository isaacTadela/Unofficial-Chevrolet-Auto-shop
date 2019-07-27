const express = require('express');
var router = express.Router();
var moment = require('moment');
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/',ensureAuthenticated, (req, res) => {
    res.render("employee/addOrEdit", {
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
    var employee = new Employee();
    employee.fullName = req.body.fullName;
	employee.vehicle = req.body.vehicle;
	employee.treatment = req.body.treatment;
	employee.cost = req.body.cost;
	employee.created_at = moment().format('MMMM Do YYYY, h:mm:ss a');
    employee.mobile = req.body.mobile;
	employee.email = req.body.email;
    employee.city = req.body.city;
	
	
	switch (employee.vehicle) {
		case 'Colorado':
            employee.img = "https://elasticbeanstalk-eu-west-3-720322189317.s3.eu-west-3.amazonaws.com/2019-awards-colorado-1.jpg";
            break;
		case 'Cruze':
			employee.img = "https://elasticbeanstalk-eu-west-3-720322189317.s3.eu-west-3.amazonaws.com/2019-awards-cruze-1.jpg";
			break;
		case 'Equinox':
			employee.img = "https://elasticbeanstalk-eu-west-3-720322189317.s3.eu-west-3.amazonaws.com/2019-awards-equinox-1.jpg";
			break;
		case 'Impala':
			employee.img = "https://elasticbeanstalk-eu-west-3-720322189317.s3.eu-west-3.amazonaws.com/2019-awards-impala-1.jpg";
			break;
		case 'Malibu':
			employee.img = "https://elasticbeanstalk-eu-west-3-720322189317.s3.eu-west-3.amazonaws.com/2019-awards-malibu-1.jpg";
			break;
		case 'Silverado':
			employee.img = "https://elasticbeanstalk-eu-west-3-720322189317.s3.eu-west-3.amazonaws.com/2019-awards-silverado-1.jpg";
			break;
		case 'Suburban':
			employee.img = "https://elasticbeanstalk-eu-west-3-720322189317.s3.eu-west-3.amazonaws.com/2019-awards-suburban-1.jpg";
			break;
		case 'Tahoe':
			employee.img = "https://elasticbeanstalk-eu-west-3-720322189317.s3.eu-west-3.amazonaws.com/2019-awards-tahoe-1.jpg";
			break;
		case 'Raverse':
			employee.img = "https://elasticbeanstalk-eu-west-3-720322189317.s3.eu-west-3.amazonaws.com/2019-awards-traverse-1.jpg";
			break;
		case 'Trax':
			employee.img = "https://elasticbeanstalk-eu-west-3-720322189317.s3.eu-west-3.amazonaws.com/2019-awards-trax-1.jpg";
			break;
		default:
			employee.img = "https://elasticbeanstalk-eu-west-3-720322189317.s3.eu-west-3.amazonaws.com/Chevrolet-logo1.png";
			break;
    }
	
	
    employee.save((err, doc) => {
        if (!err)
            res.redirect('employee/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "Insert a New Treatment",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('employee/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'Update Employee',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

router.get('/list',ensureAuthenticated, (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.render("employee/list", {
                viewTitle: "Treatments List" ,
				list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
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
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/addOrEdit", {
                viewTitle: "Update Employee",
                employee: doc
            });
        }
    });
});

router.get('/delete/:id',ensureAuthenticated, (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

module.exports = router;