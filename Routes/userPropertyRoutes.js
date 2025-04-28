const express = require("express");
const router = express.Router();
const {
  checkPropertyFeild,
  checkUpdateFeild,
} = require("../Middlewares/propertyCheckFeild");
const propertyController = require("../Controller/userPropertyController");

router
  .route("/userproperty/:id")
  .post(checkPropertyFeild, propertyController.createProperty);

router.route("/userproperties/:id").get(propertyController.getAllProperties);
router.route("/userproperty/:id").patch(propertyController.deleteUserProperty);

module.exports = router;
