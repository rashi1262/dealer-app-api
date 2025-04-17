const mongoose = require("mongoose");

// const locationSchema = new mongoose.Schema(
//   {
//     city: {
//       type: String,
//     },
//     availableLocation: {
//       type: [
//         {
//           areaName: {
//             type: String,
//           },
//           city: {
//             type: String,
//           },
//           state: {
//             type: String,
//           },
//         },
//       ],
//     },
//   },
//   { timestamps: true }
// );
const locationSchema = new mongoose.Schema(
  {
    areaName: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Location", locationSchema);
