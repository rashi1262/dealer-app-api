const moongoose = require("mongoose");

const groupSchema = new moongoose.Schema(
  {
    image: {
      type: String,
    },
    groupName: {
      type: String,
    },
    groupDescription: {
      type: String,
    },
    city: {
      type: String,
    },
    serviceArea: {
      type: [String],
    },
    groupMembers: {
      type: [],
    },
  },
  { timestamps: true }
);

module.exports = moongoose.model("Group", groupSchema);
