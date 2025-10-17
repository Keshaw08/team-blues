const jwt = require("jsonwebtoken");
const User = require("../models/User");

function extractToken(req) {
  const h = req.headers.authorization || "";
  if (h.startsWith("Bearer ")) return h.slice(7);
  if (typeof req.query?.token === "string" && req.query.token.trim() !== "") {
    return req.query.token.trim();
  }
  return null;
}

const protect = async (req, res, next) => {
  try {
    if (req.method === "OPTIONS") return next();

    const token = extractToken(req);
    if (!token) {
      return res
        .status(401)
        .json({ message: "Not authorized, no token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("auth error:", error);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

module.exports = { protect, extractToken };
