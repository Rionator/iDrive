const mongoose = require("mongoose");

const Userschema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
    maxlength: 32,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters"],
  },
  phoneNumber: {
    type: String,
    required: true,
    maxlength: 10,
  },
  gender: {
    type: String,
    required: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
});

const Userdb = mongoose.model("userdb", Userschema);

module.exports = Userdb;
