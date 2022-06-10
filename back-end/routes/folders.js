const express = require("express");
const { authToken } = require("../middleware/jwt");
const route = express.Router();
const folderController = require("../controllers/folderController.js");

route.post("/add-folder", authToken, folderController.createFolder);
route.get("/folder/:id", authToken, folderController.getFolderById);
route.get("/folder-user", authToken, folderController.getUserFolders);
route.delete("/delete-folder/:id", authToken, folderController.deleteFolderById);

module.exports = route;