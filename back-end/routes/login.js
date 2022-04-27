const express = require("express");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middleware/jwt");
const Userdb = require("../models/userModel");
const bcrypt = require("bcrypt");

require("dotenv").config();
const route = express.Router();

route.post("/login", async (req, res) => {
  if (
    Object.keys(req.body).length === 0 ||
    req.body.name === undefined ||
    req.body.password === undefined
  ) {
    res.status(400).send({ message: "Please enter Username and Password" });
    return;
  }
  const name = req.body.name;
  const password = req.body.password;
  try {
    const user = await Userdb.findOne({ name: name });
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }
    const dbpassword = user.password;

    bcrypt.compare(password, dbpassword, (err, match) => {
      if (err) {
        console.log(err);
      }
      if (match) {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        res.send({
          accessToken,
          refreshToken,
        });
      } else {
        return res.status(400).send({ message: "passwords do not match" });
      }
    });
  } catch (error) {
    return res.status(500).send({ message: "Error" });
  }
});

route.post("/refreshToken", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.sendStatus(401).send({
      message: "No token provided",
    });

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    delete user.iat;
    delete user.exp;

    const refreshedToken = generateAccessToken(user);
    res.send({
      accessToken: refreshedToken,
    });
  });
});

module.exports = route;
