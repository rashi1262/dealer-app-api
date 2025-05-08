const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  userId: { type: String },
  phone: { type: String },
  token: { type: String, required: true },
});

module.exports = mongoose.model("Token", tokenSchema);
