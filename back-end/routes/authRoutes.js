const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  forgotPasswordSendOtp,
  resetPasswordWithOtp,
  refreshToken,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/forgot-otp", forgotPasswordSendOtp);
router.post("/reset-password", resetPasswordWithOtp);

router.post("/refresh", protect, refreshToken);

module.exports = router;
