const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const mongoURI = config.get("mongoURI");
const { googleAuthRouter } = require("./routes/authRoutes");
const cookieSession = require("cookie-session");
const passport = require("passport");

require("./models/User"); // Creates / register user model
require("./services/passport"); // Get user id

const app = express();

// Middlewares
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
    keys: [config.get("cookieKey")], // key for encryption
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", googleAuthRouter);

// Connect to DB
(async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Atlas Connected...");
  } catch (error) {
    console.error(error.message);
  }
})();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is up on port ${PORT}...`));
