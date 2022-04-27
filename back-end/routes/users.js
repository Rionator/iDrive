const express = require("express");
const { authToken } = require("../middleware/jwt");
const route = express.Router();
const userController = require("../controllers/userController.js");
const fileController = require("../controllers/fileController");
// API
route.post("/users", userController.register);
route.get("/users", userController.find);
route.put("/users/:id", authToken, userController.update);
route.delete(
  "/users/:id",
  authToken,
  fileController.AdminDeleteUserDocumentsById,
  userController.deleteUserById
);
route.delete(
  "/users/self",
  authToken,
  fileController.deleteUserDocuments,
  userController.deleteSelfUser
);

module.exports = route;
