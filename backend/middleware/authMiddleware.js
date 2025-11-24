const ApiError = require("../utils/ApiError");

const authenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return next(new ApiError(401, "Unauthorized. Please login."));
};

module.exports = authenticatedUser;
