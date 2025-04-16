const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");

router.route("/users").get(userController.getAllUsers);
router.route("/user/:id").get(userController.getUser);
router.route("/user/:id").patch(userController.updateUser);
router.route("/user/:id").delete(userController.deleteUser);

module.exports = router;
