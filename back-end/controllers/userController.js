const Userdb = require("../models/userModel.js");
const bcrypt = require("bcrypt");

// create and save user

exports.register = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({ message: "Content cannot be empty" });
    return;
  }
  let password = req.body.password;

  password = bcrypt.hash(password, 10).then((password) => {
    const user = new Userdb({
      name: req.body.name,
      password: password,
      email: req.body.email,
      isAdmin: req.body.isAdmin,
    });
    user
      .save(user)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occured while creating a user",
        });
      });
  });
};

// retrieve and return all users

exports.find = (req, res) => {
  Userdb.find({}, { password: 0, __v: 0 })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error occured while retrieving user",
      });
    });
};

// Update user by user id

exports.update = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({ message: "Update data cannot be empty" });
  }
  userJWT = req.user;

  const id = req.params.id;
  // on récupère l'user dont l'id est dans les params afin de vérifier s'il est similaire à celui loggé (dans le jwt)
  const userInDb = await Userdb.findById(id);

  if (
    userJWT.isAdmin === false &&
    userInDb._id.toString() != userJWT._id.toString()
  ) {
    console.log(userJWT.isAdmin, userJWT._id, userInDb._id.toString());
    return res.status(401).send({ message: "Not authorized to update" });
  }

  Userdb.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Cannot update user with id" });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error occured while trying to Update User Information",
      });
    });
};

// delete user

exports.deleteSelfUser = async (req, res) => {
  const userJWT = req.user;

  try {
    if (userJWT.is_admin) {
      res
        .status(401)
        .send("An administrator is not allowed to delete himself.");
    } else {
      const removedUser = await User.deleteOne({ _id: userJWT._id });
      res.send(removedUser);
    }
  } catch (error) {
    res.status(500).send({ message: "Cannot delete self : " + error });
  }
};

exports.deleteUserById = async (req, res) => {
  const id = req.params.id;
  const userInDb = await Userdb.findById(id);
  userJWT = req.user;

  if (userJWT.is_admin && userJWT._id != id) {
    return res
      .status(401)
      .send({ message: "Not authorized to delete other user" });
  }
  Userdb.deleteOne({ _id: id })
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .send({ message: "Cannot delete user, Id may be wrong" });
      } else {
        res.send({ message: "User was deleted successfuly" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Internal error, could not delet user. " + err });
    });
};
