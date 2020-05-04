require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://'+process.env.mongodb_user+':'+encodeURIComponent(process.env.mongodb_password)+'@cluster1-oonad.mongodb.net/chevroletGarage?retryWrites=true&w=majority',{ useNewUrlParser: true ,useUnifiedTopology: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log(err) }
});

require('./treatment');