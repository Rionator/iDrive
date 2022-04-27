const mongoose = require("mongoose");

const Userschema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
    maxlength: 32,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const Userdb = mongoose.model("userdb", Userschema);

module.exports = Userdb;
