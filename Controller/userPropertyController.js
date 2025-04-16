const Property = require("../Model/propertyModel");
const AppError = require("../Utils/AppError");
const User = require("../Model/userModel");

exports.createProperty = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return next(new AppError("No user id.", 404));
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new AppError("User doesn't exsist.", 404));
    }
    const data = { ...req.data, phone: user.phone };
    const property = await Property.create(data);
    user.property.push(property._id);
    await user.save();
    res.status(201).json({
      status: "success",
      message: property,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

exports.getAllProperties = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return next(new AppError("No user id."));
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new AppError("User doesn't exsist.", 404));
    }
    const properties = await Property.find({ _id: { $in: user.property } });
    res.status(201).json({
      status: "success",
      totalProperties: properties.length,
      message: properties,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

exports.deleteUserProperty = async (req, res, next) => {
  try {
    if (!req.params.id) {
      return next(new AppError("No user id."));
    }
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new AppError("User doesn't exsist.", 404));
    }
    const property = await Property.findByIdAndDelete(req.body.propertyId);
    user.property = user.property.filter((el) => el != req.body.propertyId);
    await user.save();
    res.status(201).json({
      status: "success",
      message: "property successfully deleted.",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
