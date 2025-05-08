const AppError = require("../Utils/AppError");
const Location = require("../Model/locationModel");
const Group = require("../Model/groupModel");

function response(res, message, code, id) {
  return res.status(200).json({
    code,
    message,
    id,
  });
}

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

exports.checkGroup = async (req, res, next) => {
  try {
    req.body = convertBodyToLowerCase(req.body);
    const { groupName, serviceArea } = req.body;
    const group = await Group.findOne({ groupName: groupName });
    if (group) {
      return response(res, "Group name is already exist.", 1, group._id);
    }
    const location = await Group.findOne({ serviceArea: { $in: serviceArea } });
    if (location) {
      return response(
        res,
        "Group is already exist for this location.",
        2,
        location._id
      );
    }
    next();
  } catch {
    return next(new AppError(err, 500));
  }
};
