const express = require("express");
const passport = require("passport");

const googleAuthRouter = express.Router();

// Scope indicates what user info we want to read
googleAuthRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

googleAuthRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" })
);

module.exports = {
  googleAuthRouter,
};
