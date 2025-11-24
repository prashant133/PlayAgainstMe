const express = require("express");
const passport = require("../config/passport");
const {
  getProfile,
  logoutUser,
  googleCallback,
} = require("../controller/authController");

const isAuthenticated = require("../middleware/authMiddleware");

const router = express.Router();

// Step 1: Google login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    accessType: "offline",
    prompt: "consent",
  })
);

// Step 2: Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  googleCallback
);

// Profile
router.get("/profile", isAuthenticated, getProfile);

// Logout
router.get("/logout", logoutUser);

module.exports = router;
