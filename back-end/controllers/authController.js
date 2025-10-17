const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const PasswordOTP = require("../models/PasswordOTP");
const { sendMail } = require("../lib/mailer");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });

exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({
      name,
      email,
      phone,
      password,
      role: role || undefined,
    });

    return res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone || null,
      role: user.role,
      message: "User created successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const ok = await user.matchPassword(password);
    if (!ok)
      return res.status(401).json({ message: "Invalid email or password" });

    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone || null,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

function generateNumericOTP(len = 6) {
  let otp = "";
  while (otp.length < len) {
    const byte = crypto.randomBytes(1)[0] % 10;
    otp += String(byte);
  }
  return otp;
}

exports.forgotPasswordSendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const account = await User.findOne({ email });
    if (!account) {
      return res.json({ message: "If the email exists, an OTP has been sent" });
    }

    const otp = generateNumericOTP(6);
    const otpHash = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await PasswordOTP.create({ email, otpHash, purpose: "reset", expiresAt });

    await sendMail({
      to: email,
      subject: "Your OTP for password reset",
      html: `
        <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a">
          <h2 style="margin:0 0 12px">Password Reset OTP</h2>
          <p style="margin:0 0 12px">Use the following OTP to reset your password:</p>
          <p style="font-size:24px;font-weight:700;letter-spacing:6px;margin:8px 0">${otp}</p>
          <p style="margin:12px 0">This code expires in <b>10 minutes</b>.</p>
          <p style="color:#64748b;margin-top:24px">If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
      text: `Your OTP is ${otp}. It expires in 10 minutes.`,
    });

    return res.json({ message: "If the email exists, an OTP has been sent" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

exports.resetPasswordWithOtp = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword)
      return res
        .status(400)
        .json({ message: "Email, OTP and newPassword are required" });

    const record = await PasswordOTP.findOne({
      email,
      purpose: "reset",
      consumedAt: null,
    })
      .sort({ createdAt: -1 })
      .select("+otpHash");

    if (!record)
      return res.status(400).json({ message: "Invalid or expired OTP" });
    if (record.expiresAt < new Date())
      return res.status(400).json({ message: "OTP expired" });

    if (record.attempts >= 5)
      return res
        .status(429)
        .json({ message: "Too many attempts. Request a new OTP." });

    const ok = await bcrypt.compare(String(otp), record.otpHash);
    record.attempts += 1;

    if (!ok) {
      await record.save();
      return res.status(400).json({ message: "Incorrect OTP" });
    }

    record.consumedAt = new Date();
    await record.save();

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = newPassword;
    await user.save();

    return res.json({ message: "Password updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone || null,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
