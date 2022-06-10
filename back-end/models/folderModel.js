const mongoose = require("mongoose");

const Folderschema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a folder name"],
    maxlength: 32,
  },
  parentId: {
    type: String,
    required: false
  },
  userId: {
    type: String,
    required: true,
  },
  path: [],
});

const Folderdb = mongoose.model("folderdb", Folderschema);

module.exports = Folderdb;