const User = require("../models/User");
const HandledBooking = require("../models/HandledBookings");
const HandledEnquiry = require("../models/HandledEnquiries");

exports.listUsers = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 12, 50);
    const skip = (page - 1) * limit;

    const { q, role } = req.query;
    const filter = {};
    if (q) {
      filter.$or = [
        { name: new RegExp(q, "i") },
        { email: new RegExp(q, "i") },
        { phone: new RegExp(q, "i") },
      ];
    }
    if (role) filter.role = role;

    const [items, total] = await Promise.all([
      User.find(filter)
        .sort({ createdAt: -1 })
        .select("-password")
        .skip(skip)
        .limit(limit),
      User.countDocuments(filter),
    ]);

    return res.json({
      items,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (e) {
    return res.status(500).json({ message: "Server error", error: e.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const patch = {};
    ["name", "phone", "role"].forEach((k) => {
      if (req.body[k] !== undefined) patch[k] = req.body[k];
    });

    const user = await User.findByIdAndUpdate(id, patch, {
      new: true,
      runValidators: true,
      select: "-password",
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (e) {
    return res.status(500).json({ message: "Server error", error: e.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Promise.all([
      HandledBooking.updateMany(
        { createdBy: id },
        { $set: { createdBy: null } }
      ),
      HandledEnquiry.updateMany(
        { createdBy: id },
        { $set: { createdBy: null } }
      ),
    ]);
    await User.findByIdAndDelete(id);

    return res.json({
      message: "User deleted and their records have been anonymized",
    });
  } catch (e) {
    return res.status(500).json({ message: "Server error", error: e.message });
  }
};

exports.summary = async (_req, res) => {
  try {
    const [total, byRole] = await Promise.all([
      User.countDocuments(),
      User.aggregate([{ $group: { _id: "$role", count: { $sum: 1 } } }]),
    ]);
    const roles = byRole.reduce((acc, r) => ({ ...acc, [r._id]: r.count }), {});
    return res.json({ total, roles });
  } catch (e) {
    return res.status(500).json({ message: "Server error", error: e.message });
  }
};
