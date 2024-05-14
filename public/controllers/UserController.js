const { Router } = require("express");
const User = require("../models/User");
const Hash = require("../utils/Hash");

class UserController {
  static async getUsers(req, res) {
    res.send(await User.find());
  }

  static async getUserById(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        res.status(404).send({ error: "User not found" });
        return;
      }
      res.send(user);
    } catch (e) {
      res.status(500).send({ error: "Internal Server Error" });
    }
  }

  static async createUser(req, res) {
    try {
      let { email, name, password } = req.body;
      password = await Hash.hash(password);
      const user = new User({ email, name, password });
      await user.save();
      res.send(user);
      console.log("User created successfully:");
    } catch (e) {
      res.status(400).send({ error: e.stack });
    }
  }
  static async getCurrentUser(req, res) {
    console.log("req.user", req.user);
    res.send(req.user);
  }
}

module.exports = UserController;
