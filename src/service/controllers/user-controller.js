const User = require("../models/userModel");

require("dotenv").config();

async function create(req, res) {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: "User created successfully!", data: user });
  } catch (err) {
    res.status(500).send({ error: err.message });
    return;
  }
}

async function get(req, res) {
  try {
    const users = await User.find({});
    res
      .status(226)
      .json({ message: "User data retrieved successfully!", data: users });
  } catch (err) {
    res.status(500).send({ error: "Server error" });
    return;
  }
}

async function getByUsernamePassword(req, res) {
  const username = req.params.username;
  const password = req.params.password;
  try {
    const user = await User.findOne({ username: username, password: password });
    if (!user) {
      res.status(404).send({data:{ error: "User not found" }});
    } else {
      res.status(200).send({ message: "User found", data: user });
    }
  } catch (err) {
    res.status(500).send({ error: "Server error" });
  }
}

async function remove(req, res) {
  const id = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete({ _id: id });
    if (deletedUser) {
      res
        .status(200)
        .send({ message: "User deleted successfully", user: deletedUser });
    } else {
      res.status(404).send({ error: "User not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ error: "Server error" });
  }
}

async function update(req, res) {
  const id = req.params.id;
  const updatedItem = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, updatedItem, {
      new: true,
    });
    if (updatedUser) {
      res
        .status(200)
        .send({ message: "User updated successfully", user: updatedUser });
    } else {
      res.status(404).send({ error: "User not found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: "Server error" });
  }
}

module.exports = {
  get: get,
  getByUP: getByUsernamePassword,
  create: create,
  remove: remove,
  update: update,
};
