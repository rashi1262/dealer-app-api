const express = require("express");
const router = express.Router();
const locationController = require("../Controller/locationController");

router.route("/locations").get(locationController.getAllLocation);
router.route("/loation/:id").get(locationController.getLocationById);
router.route("/loation/:city").get(locationController.getLocationByCity);
router.route("/location").post(locationController.createLocation);

module.exports = router;
