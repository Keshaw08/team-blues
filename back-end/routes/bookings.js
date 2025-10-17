const express = require("express");
const Booking = require("../models/Bookings");
const HandledBooking = require("../models/HandledBookings");
const { sendMail } = require("../lib/mailer");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.use(protect);

router.post("/", async (req, res) => {
  try {
    let tentAdults = req.body.tentAdults;
    if (typeof tentAdults === "string") {
      tentAdults = tentAdults
        .split(/\r?\n/)
        .map((s) => s.trim())
        .filter(Boolean);
    }
    if (!Array.isArray(tentAdults)) tentAdults = [];

    let persons = req.body.persons;
    if (!persons) {
      const total = tentAdults
        .map((n) => parseInt(n, 10) || 0)
        .reduce((a, c) => a + c, 0);
      persons = total ? String(total) : "";
    }

    const payload = {
      step: Number.isFinite(+req.body.step) ? +req.body.step : 1,
      status: req.body.status === "completed" ? "completed" : "pending",

      firstName: req.body.firstName || "",
      lastName: req.body.lastName || "",
      fullName:
        (req.body.fullName || "").trim() ||
        `${req.body.firstName || ""} ${req.body.lastName || ""}`.trim(),
      countryCode: req.body.countryCode || "+91",
      phone: req.body.phone || "",
      email: req.body.email || "",

      package: req.body.package || "",
      checkIn: req.body.checkIn || "",
      persons,
      tents: req.body.tents || "",
      tentType: req.body.tentType || "",
      tentAdults,

      age: req.body.age || "",
      gender: req.body.gender || "",
      paymentMode: req.body.paymentMode || "",
    };

    const booking = await Booking.create(payload);
    res.json({ success: true, booking });
  } catch (err) {
    console.error("Create booking failed:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

router.get("/summary", async (_req, res) => {
  try {
    const total = await Booking.countDocuments();
    const pending = await Booking.countDocuments({ status: "pending" });
    const completed = await Booking.countDocuments({ status: "completed" });
    res.json({ success: true, summary: { total, pending, completed } });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking)
      return res.status(404).json({ success: false, error: "Not found" });
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { q = "", status, page = 1, limit = 12, on } = req.query;
    const p = Math.max(1, parseInt(page, 10) || 1);
    const l = Math.min(50, Math.max(1, parseInt(limit, 10) || 12));

    const filter = {};
    if (status) filter.status = status;
    if (on) {
      const start = new Date(`${on}T00:00:00.000Z`);
      const end = new Date(`${on}T23:59:59.999Z`);
      filter.createdAt = { $gte: start, $lte: end };
    }

    if (q && String(q).trim()) {
      const rx = new RegExp(String(q).trim(), "i");
      filter.$or = [
        { firstName: rx },
        { lastName: rx },
        { fullName: rx },
        { email: rx },
        { phone: rx },
        { package: rx },
      ];
    }

    const [items, total] = await Promise.all([
      Booking.find(filter)
        .sort({ createdAt: -1 })
        .skip((p - 1) * l)
        .limit(l),
      Booking.countDocuments(filter),
    ]);

    const pages = Math.max(1, Math.ceil(total / l));
    res.json({ success: true, items, total, page: p, pages, limit: l });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const allowed = [
      "firstName",
      "lastName",
      "fullName",
      "email",
      "phone",
      "countryCode",
      "package",
      "checkIn",
      "persons",
      "tents",
      "tentType",
      "tentAdults",
      "age",
      "gender",
      "paymentMode",
      "status",
      "step",
    ];
    const update = {};
    for (const k of allowed) if (k in req.body) update[k] = req.body[k];

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      { new: true }
    );
    if (!booking)
      return res.status(404).json({ success: false, error: "Not found" });
    res.json({ success: true, booking });
  } catch (e) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

router.post("/:id/email", async (req, res) => {
  try {
    const { to, cc, bcc, subject, html, text } = req.body || {};
    if (!to || !subject || !html)
      return res.status(400).json({ message: "to, subject, html required" });
    await sendMail({ to, cc, bcc, subject, html, text });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ message: "Failed to send email" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const exists = await Booking.findById(id);
    if (!exists) {
      return res.status(404).json({ success: false, error: "Not found" });
    }

    await Booking.findByIdAndDelete(id);
    await HandledBooking.deleteMany({
      $or: [{ booking: id }, { bookingId: id }],
    });

    res.json({ success: true });
  } catch (err) {
    console.error(`Handled cascade failed for booking ${req.params.id}`, err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
