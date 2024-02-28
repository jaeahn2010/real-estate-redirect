const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
	email: {type: String, unique: true, required: true},
	password: {type: String, minlength: 10, required: true},
    category: {type: String, required: true} //buyer or seller
})

module.exports = mongoose.model('User', userSchema)