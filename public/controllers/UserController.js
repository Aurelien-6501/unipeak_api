const { Router } = require("express");
const User = require("../models/User");
const Hash = require("../utils/Hash");
const jwt = require("jsonwebtoken");

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
      res.status(201).send(user); // Renvoie l'utilisateur créé avec un statut 201
      console.log("User created successfully:");
    } catch (e) {
      res.status(400).send({ error: e.stack }); // Envoie le message d'erreur en cas d'échec
    }
  }

  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        res.status(401).send({ error: "Invalid email or password" });
        return;
      }

      const isPasswordValid = await Hash.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).send({ error: "Invalid email or password" });
        return;
      }

      // Générer un token JWT
      const token = jwt.sign({ userId: user._id }, "jwt_secret", {
        expiresIn: "1h",
      });

      res.send({ message: "Login successful", token });
    } catch (e) {
      res.status(500).send({ error: "Internal Server Error" });
    }
  }

  static async getCurrentUser(req, res) {
    console.log("req.user", req.user);
    res.send(req.user);
  }
}

module.exports = UserController;
