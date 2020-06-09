const express = require("express");
const passport = require("passport");

const googleAuthRouter = express.Router();

// Scope indicates what user info we want to read
googleAuthRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

googleAuthRouter.get("/auth/google/callback", passport.authenticate("google"));

googleAuthRouter.get("/api/logout", (req, res) => {
  // req.logout attached by passport
  req.logout();
  if (req.user) {
    res.send(req.user);
  } else {
    res.send("Not logged in");
  }
});

googleAuthRouter.get("/api/current_user", (req, res) => {
  // req.user attached by passport
  if (req.user) {
    res.send(req.user);
  } else {
    res.send("Not logged in");
  }
});

module.exports = {
  googleAuthRouter,
};
