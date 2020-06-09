const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: String,
});

// Save the model
mongoose.model("users", userSchema);
