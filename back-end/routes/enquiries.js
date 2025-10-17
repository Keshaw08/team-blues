const express = require("express");
const router = express.Router();
const Enquiry = require("../models/Enquiry");
const { sendMail } = require("../lib/mailer");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.get("/", async (req, res) => {
  try {
    const { q = "", on = "", page = 1, limit = 12 } = req.query;
    const p = Math.max(1, parseInt(page, 10) || 1);
    const l = Math.min(50, Math.max(1, parseInt(limit, 10) || 12));

    const filter = {};
    if (q && String(q).trim()) {
      const rx = new RegExp(String(q).trim(), "i");
      filter.$or = [
        { name: rx },
        { email: rx },
        { phone: rx },
        { countryCode: rx },
        { tentType: rx },
        { remark: rx },
      ];
    }
    if (on) {
      const start = new Date(`${on}T00:00:00.000Z`);
      const end = new Date(`${on}T23:59:59.999Z`);
      const dateOr = [
        { createdAt: { $gte: start, $lte: end } },
        { checkIn: { $gte: start, $lte: end } },
      ];
      filter.$or = Array.isArray(filter.$or)
        ? [...filter.$or, ...dateOr]
        : dateOr;
    }

    const [items, total] = await Promise.all([
      Enquiry.find(filter)
        .sort({ createdAt: -1 })
        .skip((p - 1) * l)
        .limit(l),
      Enquiry.countDocuments(filter),
    ]);

    res.json({
      success: true,
      items,
      total,
      page: p,
      pages: Math.max(1, Math.ceil(total / l)),
      limit: l,
    });
  } catch (e) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

router.get("/summary", async (_req, res) => {
  try {
    const total = await Enquiry.countDocuments();
    res.json({ success: true, summary: { total } });
  } catch {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry)
      return res.status(404).json({ success: false, error: "Not found" });
    res.json({ success: true, enquiry });
  } catch {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.body || {});
    res.json({ success: true, enquiry });
  } catch (e) {
    res.status(400).json({ success: false, error: "Invalid data" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const allowed = [
      "name",
      "countryCode",
      "phone",
      "email",
      "checkIn",
      "persons",
      "rooms",
      "nights",
      "tentType",
      "remark",
      "agree",
    ];
    const update = {};
    for (const k of allowed) if (k in req.body) update[k] = req.body[k];

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      { new: true }
    );
    if (!enquiry)
      return res.status(404).json({ success: false, error: "Not found" });
    res.json({ success: true, enquiry });
  } catch {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

router.post("/:id/email", async (req, res) => {
  try {
    const { to, cc, bcc, subject, html, text } = req.body || {};
    if (!to || !subject || !html) {
      return res.status(400).json({ message: "to, subject, html required" });
    }
    const exists = await Enquiry.findById(req.params.id).lean();
    if (!exists) return res.status(404).json({ message: "Enquiry not found" });

    await sendMail({ to, cc, bcc, subject, html, text });
    res.json({ ok: true });
  } catch (e) {
    console.error("enquiry email failed:", e);
    res.status(500).json({ message: "Failed to send email" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const exists = await Enquiry.findById(id);
    if (!exists)
      return res.status(404).json({ success: false, error: "Not found" });

    await Enquiry.findByIdAndDelete(id);

    try {
      const HandledEnquiry = require("../models/HandledEnquiries");
      await HandledEnquiry.deleteMany({
        $or: [{ enquiry: id }, { enquiryId: id }],
      });
    } catch (e) {
      console.warn("HandledEnquiries cleanup skipped:", e?.message);
    }

    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
