const express = require("express");
const router = express.Router();
const locationController = require("../Controller/locationController");

router.route("/allloactions").post(locationController.allData);
router.route("/locations").get(locationController.getAllLocation);
router.route("/location/:id").get(locationController.getLocationById);
router.route("/location/city/:city").get(locationController.getLocationByCity);
router.route("/location").post(locationController.createLocation);
router.route("/location/:id").patch(locationController.updateLocation);
router.route("/location/:id").delete(locationController.deleteLocation);
router.route("/cities").get(locationController.getAllCity);

module.exports = router;
