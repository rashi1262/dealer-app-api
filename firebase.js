const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const admin = require("firebase-admin");

if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
  throw new Error(
    "Missing GOOGLE_SERVICE_ACCOUNT_KEY in environment variables"
  );
}

const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
