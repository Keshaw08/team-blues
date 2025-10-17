const express = require("express");
const Booking = require("../models/Bookings");
const HandledBooking = require("../models/HandledBookings");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.use(protect);

router.post("/bookings/:id/handled", async (req, res, next) => {
  try {
    const { note, assignedTo } = req.body || {};
    const bookingId = req.params.id;

    const exists = await Booking.findById(bookingId);
    if (!exists)
      return res
        .status(404)
        .json({ success: false, error: "Booking not found" });

    const doc = await HandledBooking.findOneAndUpdate(
      { booking: bookingId },
      {
        $set: {
          booking: bookingId,
          note: note || "",
          createdBy: req.user.id,
          assignedTo: assignedTo || null,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email")
      .populate("booking");

    res.json({ success: true, handled: doc });
  } catch (e) {
    next(e);
  }
});

router.get("/bookings/:id/handled", async (req, res, next) => {
  try {
    const doc = await HandledBooking.findOne({ booking: req.params.id })
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");
    res.json(doc || null);
  } catch (e) {
    next(e);
  }
});

router.get("/", async (req, res) => {
  try {
    const { q = "", page = 1, limit = 12 } = req.query;
    const p = Math.max(1, parseInt(page, 10) || 1);
    const l = Math.min(50, Math.max(1, parseInt(limit, 10) || 12));
    const rx = q && String(q).trim() ? new RegExp(String(q).trim(), "i") : null;

    const bookingSelect = [
      "firstName",
      "lastName",
      "fullName",
      "email",
      "phone",
      "countryCode",
      "package",
      "checkIn",
      "tentType",
      "tents",
      "paymentMode",
      "status",
      "step",
      "tentAdults",
      "persons",
    ].join(" ");

    const all = await HandledBooking.find({})
      .populate({ path: "booking", select: bookingSelect })
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 })
      .lean();

    const filtered = rx
      ? all.filter((h) => {
          const b = h.booking || {};
          return (
            rx.test(h.note || "") ||
            rx.test(b.firstName || "") ||
            rx.test(b.lastName || "") ||
            rx.test(b.fullName || "") ||
            rx.test(b.email || "") ||
            rx.test(b.phone || "") ||
            rx.test(b.package || "")
          );
        })
      : all;

    const total = filtered.length;
    const pages = Math.max(1, Math.ceil(total / l));
    const start = (p - 1) * l;
    const items = filtered.slice(start, start + l);

    res.json({ success: true, items, total, page: p, pages, limit: l });
  } catch (err) {
    console.error("Handled list failed:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

router.delete("/bookings/:id/handled", async (req, res, next) => {
  try {
    const bookingId = req.params.id;

    const handledDoc = await HandledBooking.findOne({ booking: bookingId });

    if (!handledDoc) {
      return res
        .status(404)
        .json({ success: false, error: "Booking is not marked as handled" });
    }

    if (handledDoc.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: "Forbidden: You did not mark this booking as handled.",
      });
    }

    await HandledBooking.findByIdAndDelete(handledDoc._id);

    res.json({ success: true });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
