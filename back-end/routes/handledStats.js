const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const HandledBooking = require("../models/HandledBookings");
const HandledEnquiry = require("../models/HandledEnquiries");

const router = express.Router();
router.use(protect);

router.get("/users", async (req, res) => {
  try {
    const [bk, eq] = await Promise.all([
      HandledBooking.aggregate([
        { $group: { _id: "$createdBy", bookings: { $sum: 1 } } },
      ]),
      HandledEnquiry.aggregate([
        { $group: { _id: "$createdBy", enquiries: { $sum: 1 } } },
      ]),
    ]);

    const map = {};
    bk.forEach((x) => {
      if (!x._id) return;
      map[String(x._id)] = { bookings: x.bookings, enquiries: 0 };
    });
    eq.forEach((x) => {
      if (!x._id) return;
      const id = String(x._id);
      map[id] = { bookings: map[id]?.bookings || 0, enquiries: x.enquiries };
    });

    res.json({ success: true, users: map });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

router.get("/users/:id/recent", async (req, res) => {
  try {
    const limit = Math.max(
      1,
      Math.min(20, parseInt(req.query.limit || "5", 10))
    );
    const [bookings, enquiries] = await Promise.all([
      HandledBooking.find({ createdBy: req.params.id })
        .sort({ createdAt: -1 })
        .limit(limit)
        .select("booking note createdAt")
        .populate("booking", "fullName firstName lastName email phone checkIn")
        .lean(),
      HandledEnquiry.find({ createdBy: req.params.id })
        .sort({ createdAt: -1 })
        .limit(limit)
        .select("enquiry note createdAt")
        .populate("enquiry", "name email phone checkIn")
        .lean(),
    ]);
    res.json({ success: true, bookings, enquiries });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
