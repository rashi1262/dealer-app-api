const Property = require("../Model/propertyModel");
const AppError = require("../Utils/AppError");
const ApiFeatures = require("../Utils/ApiFeatures");

exports.createProperty = async (req, res, next) => {
  try {
    const property = await Property.create(req.data);
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
    // const properties = await Property.find().sort("-createdAt");
    const features = new ApiFeatures(Property.find(), req.query)
      .filter()
      .sort()
      .page();
    const properties = await features.query;
    res.status(201).json({
      status: "success",
      totalProperties: properties.length,
      message: properties,
    });
  } catch (error) {
    console.log(error);
    return next(new AppError(error.message, 500));
  }
};

exports.getPropertyById = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    res.status(201).json({
      status: "success",
      message: property,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
exports.updateProperty = async (req, res, next) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).json({
      status: "success",
      message: property,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
exports.deleteProperty = async (req, res, next) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    res.status(201).json({
      status: "success",
      message: "property successfully deleted.",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
