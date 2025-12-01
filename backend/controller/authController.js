const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

const googleCallback = (req, res) => {
  res.redirect(`${process.env.CLIENT_URL}/`);
};

const getProfile = (req, res, next) => {
  try {
    if (!req.user) {
      // If user not logged in, throw error
      throw new ApiError(401, "Unauthorized. Please login.");
    }

    res.status(200).json(
      new ApiResponse(200, {
        name: req.user.name,
        email: req.user.email,
        profilePic: req.user.profilePic,
      })
    );
  } catch (err) {
    next(err);
  }
};

const logoutUser = (req, res, next) => {
  try {
    req.logout(() => {
      res
        .status(200)
        .json(new ApiResponse(200, null, "Logged out successfully"));
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { googleCallback, getProfile, logoutUser };
