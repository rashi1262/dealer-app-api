const Property = require("../Model/propertyModel");
const Location = require("../Model/locationModel");
const AppError = require("../Utils/AppError");

exports.createLocation = async (req, res, next) => {
  try {
    let location;
    location = await Location.findOne({ city: req.body.city });
    if (!location) {
      location = await Location.create(req.body);
    } else {
      location.availableLocation.push(req.body.availableLocation);
    }
    await location.save();
    res.status(201).json({
      status: "success",
      message: location,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

exports.getAllLocation = async (req, res, next) => {
  try {
    const location = await Location.find();
    res.status(200).json({
      status: "success",
      totalProperties: location.length,
      message: location,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

exports.getLocationById = async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.id);
    res.status(200).json({
      status: "success",
      message: location,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
exports.getLocationByCity = async (req, res, next) => {
  try {
    const location = await Location.findOne({ city: req.params.city });
    if (!location) {
      return next(new AppError("City not fournd", 404));
    }
    res.status(200).json({
      status: "success",
      message: location,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

exports.updateLocation = async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.id);
    if (req.body.city) {
      location.city.push(req.body.city);
    } else if (req.body.state) {
      location.state.push(req.body.state);
    } else if (req.body.areaName) {
      location.state.push(req.body.areaName);
    } else if (req.body.push())
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
    console.log(req.params.id);
    const property = await Property.findByIdAndDelete(req.params.id);
    res.status(201).json({
      status: "success",
      message: "property successfully deleted.",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
