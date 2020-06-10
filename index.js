const express = require("express");
const mongoose = require("mongoose");
const { cookieKey, mongoURI } = require("./config/keys");
const { googleAuthRouter } = require("./routes/authRoutes");
const { stripeRouter } = require("./routes/billingRoutes");
const cookieSession = require("cookie-session");
const passport = require("passport");

require("./models/User"); // Creates / register user model
require("./services/passport"); // Get user id

const app = express();
app.use(express.json());

// Middlewares
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
    keys: [cookieKey], // key for encryption
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", googleAuthRouter);
app.use("/", stripeRouter);

if (process.env.NODE_ENV === "production") {
  // If production, express serves up production assets
  app.use(express.static("client/build"));

  // Catch all route - index.html
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Connect to DB
(async () => {
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB Atlas Connected...");
})();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is up on port ${PORT}...`));
