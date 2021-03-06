module.exports = (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ error: "Unauthorized payment, user not logged in" });
  } else {
    next();
  }
};
