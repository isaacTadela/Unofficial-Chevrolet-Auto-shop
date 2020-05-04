const mongoose = require('mongoose');
const findOneOrCreate = require('mongoose-find-one-or-create');
const userSchema = new mongoose.Schema({
	
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
userSchema.plugin(findOneOrCreate);
const User = mongoose.model('user', userSchema);

module.exports = User;
