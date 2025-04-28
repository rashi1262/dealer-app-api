const express = require("express");
const router = express.Router();
const {
  saveToken,
  sendNotification,
  sendNotificationToAll,
  sendTextToAll,
} = require("../Controller/notificationController");

router.post("/store-token/:userId", saveToken);
router.post("/send-notification/:userId", sendNotification);
router.post("/send-notification/", sendNotificationToAll);
router.post("/send-text", sendTextToAll);

module.exports = router;
