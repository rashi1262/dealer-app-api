const User = require("../Model/userModel");
const Group = require("../Model/groupModel");
const AppError = require("../Utils/AppError");
const Location = require("../Model/locationModel");

exports.createGroup = async (req, res, next) => {
  try {
    const group = await Group.create({ ...req.body });
    const user = await User.findById(req.params.id);
    user.groups.push(group._id);
    await user.save();

    res.status(201).json({
      status: "success",
      message: group,
    });
  } catch (error) {
    console.log(error);
    return next(new AppError(error.message, 500));
  }
};

exports.getAllgroups = async function (req, res, next) {
  try {
    const groups = await Group.find().select("-__v");
    res.status(201).json({
      status: "sucess",
      totalUsers: groups.length,
      message: groups,
    });
  } catch (err) {
    return next(new AppError(err, 403));
  }
};

exports.getGroup = async function (req, res, next) {
  try {
    const group = await Group.findOne({ _id: req.params.id });
    if (group === null) {
      return next(new AppError("Invalid Id or Group doesn't exist.", 404));
    }
    res.status(201).json({
      status: "sucesss",
      message: group,
    });
  } catch (err) {
    console.log(err);
    return next(new AppError(err, 403));
  }
};

function convertBodyToLowerCase(obj) {
  const lowered = {};
  for (const key in obj) {
    if (typeof obj[key] === "string") {
      lowered[key] = obj[key].toLowerCase();
    } else {
      lowered[key] = obj[key];
    }
  }
  return lowered;
}

exports.updateGroup = async function (req, res, next) {
  try {
    const group = await Group.findOne({ _id: req.params.id });
    if (group === null) {
      return next(new AppError("Invalid Id or Group doesn't exist.", 404));
    }
    req.body = convertBodyToLowerCase(req.body);
    const response = await Group.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(201).json({
      status: "sucess",
      message: response,
    });
  } catch (err) {
    return next(new AppError(err, 403));
  }
};

exports.deleteGroup = async function (req, res, next) {
  try {
    const group = await Group.findOne({ _id: req.params.id });
    if (group === null) {
      return next(new AppError("Invalid Id or Group doesn't exist.", 404));
    }

    const message = await Group.findByIdAndDelete(req.params.id);

    res.status(201).json({
      status: "sucesss",
    });
  } catch (err) {
    return next(new AppError(err, 403));
  }
};

exports.joinGroup = async (req, res, next) => {
  try {
    const group = await Group.findById(req.params.id);
    const user = await User.findById(req.body.id);
    const data = {
      name: user.name,
      number: user.phone,
    };
    group.groupMembers.push(data);
    user.joinedGroup.push(group._id);
    await group.save();
    await user.save();
    res.status(201).json({
      status: "success",
      message: group,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

exports.getAlljoinedGroup = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const groups = await Group.find({ _id: { $in: user.joinedGroup } }).sort(
      "-createdAt"
    );
    res.status(201).json({
      status: "success",
      message: groups,
    });
  } catch (error) {
    console.log(error);
    return next(new AppError(error.message, 500));
  }
};

exports.getAllCreateGroup = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const groups = await Group.find({ _id: { $in: user.groups } }).sort(
      "-createdAt"
    );
    res.status(201).json({
      status: "success",
      message: groups,
    });
  } catch (error) {
    console.log(error);
    return next(new AppError(error.message, 500));
  }
};

exports.checkGroup = async (req, res, next) => {
  try {
    const group = await Group.findOne({
      serviceArea: { $in: req.params.serviceArea },
    });
    res.status(201).json({
      status: "success",
      message: group,
    });
  } catch (error) {
    console.log(error);
    return next(new AppError(error.message, 500));
  }
};

exports.updateMembers = async function (req, res, next) {
  try {
    const group = await Group.findOne({ _id: req.params.id });
    if (group === null) {
      return next(new AppError("Invalid Id or Group doesn't exist.", 404));
    }

    const data = [...group.groupMembers, ...req.body];

    group.groupMembers = data;

    await group.save();

    res.status(201).json({
      status: "success",
      message: group,
    });
  } catch (err) {
    console.log(err);
    return next(new AppError(err, 403));
  }
};
