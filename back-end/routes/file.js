const express = require("express");
const { authToken } = require("../middleware/jwt");
const { upload } = require("../middleware/upload");
const route = express.Router();
const fileController = require("../controllers/fileController.js");

// API
route.post(
  "/create-file",
  authToken,
  upload.single("input_file"),
  fileController.createFile
);
route.get("/file/:id", authToken, fileController.getFileById);
route.get("/files-user", authToken, fileController.getUserFiles);
route.get("/count-file", authToken, fileController.getUserFileCount);
route.get("/download/:id", authToken, fileController.downloadFileById);
route.delete("/delete-file/:id", authToken, fileController.deleteFileById);

module.exports = route;
