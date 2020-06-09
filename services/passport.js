const passport = require("passport");
const { GoogleClientID, GoogleClientSecret } = require("../config/keys");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

// Extract the User model
const User = mongoose.model("users");

// Tells passport how to turn user into cookie and stuff id in
passport.serializeUser((user, done) => {
  // Use user.id(Object.id) to identify the user
  done(null, user.id);
});

// Tells passport how to turn cookie back into user
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// Creates new instance of GoogleStrategy, pass in options
// Tells passport to use it
passport.use(
  new GoogleStrategy(
    {
      clientID: GoogleClientID,
      clientSecret: GoogleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    // Callback is called when hit the /auth/google/callback
    async (accessToken, refreshToken, profile, done) => {
      const { id } = profile;
      try {
        const existingUser = await User.findOne({ googleId: id });
        if (existingUser) {
          done(null, existingUser); // existingUser is the 1st argument of serializeUser callback
        } else {
          const newUser = await new User({ googleId: id }).save();
          done(null, newUser);
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  )
);
