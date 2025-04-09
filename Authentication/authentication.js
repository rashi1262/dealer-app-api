const User = require("../Model/userModel");
const AppError = require("../Utils/AppError");
const jwt = require("jsonwebtoken");

const jwtToken = function (id) {
  const token = jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  return token;
};

exports.signup = async function (req, res, next) {
  try {
    const data = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    };

    const user = await User.create(data);
    if (!user) {
      return next(new AppError("signup failed..."));
    }
    const token = jwtToken(user._id);
    res.cookie("auth", token, {
      httpOnly: false,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      status: "sucess",
      token: token,
      message: user,
    });
  } catch (err) {
    return next(new AppError(err, 403));
  }
};

exports.login = async function (req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(new AppError("User doesn't exists."));
    }

    if (!(await user.checkPassword(user.password, password))) {
      return next(new AppError("Password is inccorect."));
    }

    const token = jwtToken(user._id);
    res.cookie("auth", token, {
      httpOnly: false,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      status: "sucess",
      token: token,
      message: user,
    });
  } catch (err) {
    return next(new AppError(err, 403));
  }
};
