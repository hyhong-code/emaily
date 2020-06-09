const passport = require("passport");
const config = require("config");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Creates new instance of GoogleStrategy, pass in options
// Tells passport to use it
passport.use(
  new GoogleStrategy(
    {
      clientID: config.get("GoogleClientID"),
      clientSecret: config.get("GoogleClientSecret"),
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Callback is called when hit the /auth/google/callback
      console.log("accessToken:", accessToken);
      console.log("refreshToken:", refreshToken);
      console.log("profile:", profile);
    }
  )
);
