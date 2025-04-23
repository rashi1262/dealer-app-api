const express = require("express");
const router = express.Router();
const groupController = require("../Controller/groupController");
const group = require("../Middlewares/group");

router.route("/group/:id").post(group.checkGroup, groupController.createGroup);
router.route("/groups").get(groupController.getAllgroups);
router.route("/group/:id").get(groupController.getGroup);
router.route("/group/:id").patch(groupController.updateGroup);
router.route("/group/:id").delete(groupController.deleteGroup);
router.route("/join/group/:id").patch(groupController.joinGroup);
router.route("/joined/groups/:id").get(groupController.getAlljoinedGroup);
router.route("/created/groups/:id").get(groupController.getAllCreateGroup);
router.route("/updatemembers/group/:id").patch(groupController.updateMembers);

router.route("/check/group/:serviceArea").get(groupController.checkGroup);
module.exports = router;
