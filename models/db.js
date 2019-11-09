const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://isaacT:'+ encodeURIComponent('password')+'@cluster1-oonad.mongodb.net/chevroletGarage?retryWrites=true&w=majority',{ useNewUrlParser: true ,useUnifiedTopology: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./treatment');
