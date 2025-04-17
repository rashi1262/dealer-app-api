const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./Controller/errorController");
const AppError = require("./Utils/AppError");
const cookieParser = require("cookie-parser");

const authRoutes = require("./Routes/authRoutes");
const userRoutes = require("./Routes/userRoutes");
const propertyRoutes = require("./Routes/propertyRoutes");
const wishlistRoutes = require("./Routes/wishlistRoutes");
const userPropertyRoutes = require("./Routes/userPropertyroutes");
const locationRoutes = require("./Routes/locationRoutes");
const groupRoutes = require("./Routes/groupRoutes");

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", propertyRoutes);
app.use("/api/v1", wishlistRoutes);
app.use("/api/v1", userPropertyRoutes);
app.use("/api/v1", locationRoutes);
app.use("/api/v1", groupRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);
module.exports = app;
