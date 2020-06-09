// keys.js - Figure out which set of credentials to return
if (process.env.NODE_ENV === "production") {
  // Production mode, return prod key set
  module.exports = require("./prod");
} else {
  // Pevelopment mode, return dev key set
  module.exports = require("./dev");
}
