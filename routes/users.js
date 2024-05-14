var express = require('express');
const router = express.Router();
const User = require('../public/models/User');
const UserController = require('../public/controllers/UserController');


//ROUTE USER
router.get("/", UserController.getUsers);
router.get("/@me", UserController.getCurrentUser);
router.get("/:id", UserController.getUserById);
router.post("/signup", UserController.createUser);



module.exports = router;
