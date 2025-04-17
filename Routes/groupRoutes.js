const express = require("express");
const router = express.Router();
const groupController = require("../Controller/groupController");
const group = require("../Middlewares/group");

router.route("/group").post(group.checkGroup, groupController.createGroup);
router.route("/groups").get(groupController.getAllgroups);
router.route("/group/:id").get(groupController.getGroup);
router.route("/group/:id").patch(groupController.updateGroup);
router.route("/group/:id").delete(groupController.deleteGroup);

module.exports = router;
