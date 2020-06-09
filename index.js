const express = require("express");
require("./services/passport");
const { googleAuthRouter } = require("./routes/authRoutes");

const app = express();
app.use("/", googleAuthRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server up on port ${PORT}...`));
