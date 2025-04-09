const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email already exists."],
      validate: [validator.isEmail, "Not valid email."],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: [true, "Phone number already exists."],
      minLength: 10,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 8,
    },
    confirmPassword: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: function (el) {
          return this.password === el;
        },
        message: "Password doesn't same.",
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
  }
  next();
});

userSchema.methods.checkPassword = async function (userPassword, password) {
  const value = await bcrypt.compare(password, userPassword);
  return value;
};

const User = mongoose.model("Chat-User", userSchema);
module.exports = User;
