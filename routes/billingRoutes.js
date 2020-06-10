const express = require("express");
const { stripeSecretKey } = require("../config/keys");
const stripe = require("stripe")(stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

const stripeRouter = express.Router();

stripeRouter.post("/api/stripe", requireLogin, async (req, res) => {
  const charge = await stripe.charges.create({
    amount: 500,
    currency: "usd",
    description: "$5 for 5 email tokens",
    source: req.body.id,
  });
  req.user.credits += 5;
  const user = await req.user.save();
  return res.json(user);
});

module.exports = {
  stripeRouter,
};
