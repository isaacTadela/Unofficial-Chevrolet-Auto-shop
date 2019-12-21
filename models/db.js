require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://'+process.env.MONGODB_USER+':'+encodeURIComponent(process.env.MONGODB_PASS)+'@cluster1-oonad.mongodb.net/chevroletGarage?retryWrites=true&w=majority',{ useNewUrlParser: true ,useUnifiedTopology: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log(err) }
});

require('./treatment');