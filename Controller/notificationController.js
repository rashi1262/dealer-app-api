const Token = require("../Model/tokenModel");
const admin = require("../firebase");
const axios = require("axios");
const User = require("../Model/userModel");
const AppError = require("../Utils/AppError");

exports.saveToken = async (req, res) => {
  const { token } = req.body;
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(new AppError("User not found.", 404));
    }

    const existing = await Token.findOne({ userId: req.params.userId });
    if (!existing) {
      await Token.create({
        userId: req.params.userId,
        token,
        phone: user.phone,
      });
    } else {
      existing.token = token;
      existing.phone = user.phone;
      await existing.save();
    }
    console.log(user);
    res.status(200).json({ message: "Token saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error saving token" });
  }
};

exports.sendNotification = async (req, res) => {
  const { title, body } = req.body;

  try {
    const tokensData = await Token.findOne({ userId: req.params.userId });
    if (!tokensData) {
      return next(new AppError("User not found.", 404));
    }

    const results = await axios.post("https://exp.host/--/api/v2/push/send", {
      to: tokensData.token,
      title,
      body,
      sound: "default",
    });

    // const results = await Promise.all(
    //   axios.post("https://exp.host/--/api/v2/push/send", {
    //     to: tokensData.token,
    //     title,
    //     body,
    //     sound: "default",
    //   })
    // );

    res.status(200).json({
      message: "Notifications sent",
      results: results.data,
    });
  } catch (error) {
    console.error("Notification error:", error.message);
    res.status(500).json({ error: "Failed to send notification" });
  }
};

exports.sendNotificationToAll = async (req, res) => {
  const { title, body, users } = req.body;

  try {
    const tokensData = await Token.find({ phone: { $in: users } });
    const tokens = tokensData.map((t) => t.token);

    const results = await Promise.all(
      tokens.map((token) =>
        axios.post("https://exp.host/--/api/v2/push/send", {
          to: token,
          title,
          body,
          sound: "default",
        })
      )
    );

    res.status(200).json({
      message: "Notifications sent",
      results: results.map((r) => r.data),
    });
  } catch (error) {
    console.error("Notification error:", error.message);
    res.status(500).json({ error: "Failed to send notification" });
  }
};

exports.sendTextToAll = async (req, res) => {
  const { body, users } = req.body;

  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require("twilio")(accountSid, authToken);
    const message = await client.messages.create({
      body: body,
      from: "+16202981655",
      to: users[0],
    });
    res.status(200).json({
      status: "Message sent",
      message,
    });
  } catch (error) {
    console.error("Notification error:", error.message);
    res.status(500).json({ error: "Failed to send notification" });
  }
};
