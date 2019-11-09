const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://isaacT:'+ encodeURIComponent('1Q2W3E4R5T6Y')+'@cluster1-oonad.mongodb.net/chevroletGarage?retryWrites=true&w=majority',{ useNewUrlParser: true ,useUnifiedTopology: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./treatment');