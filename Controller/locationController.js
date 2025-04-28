const Property = require("../Model/propertyModel");
const Location = require("../Model/locationModel");
const AppError = require("../Utils/AppError");

exports.allData = async (req, res, next) => {
  location = await Location.create(req.body);
  res.status(201).json({
    status: "success",
    message: location,
  });
};

exports.createLocation = async (req, res, next) => {
  try {
    let location;
    const { city, areaName, state } = req.body;
    location = await Location.findOne({
      $and: [{ city: city }, { areaName: areaName }, { state: state }],
    });
    if (location) {
      return res.status(200).json({
        status: "success",
        message: "Location already exist",
      });
    }
    location = await Location.create(req.body);
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
    const location = await Location.find({ city: req.params.city });
    if (!location) {
      return next(new AppError("City not found", 404));
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
    const location = await Location.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).json({
      status: "success",
      message: location,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
exports.deleteLocation = async (req, res, next) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);

    res.status(201).json({
      status: "success",
      message: location,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

exports.getAllCity = async (req, res, next) => {
  try {
    const cities = await Location.distinct("city");

    res.status(201).json({
      status: "success",
      message: cities,
    });
  } catch (error) {
    console.log(error);
    return next(new AppError(error.message, 500));
  }
};
