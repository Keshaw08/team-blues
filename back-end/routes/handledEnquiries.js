const express = require("express");
const HandledEnquiry = require("../models/HandledEnquiries");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.use(protect);

router.post("/enquiries/:id/handled", async (req, res, next) => {
  try {
    const { note, assignedTo } = req.body || {};
    const doc = await HandledEnquiry.findOneAndUpdate(
      { enquiry: req.params.id },
      {
        $set: {
          note: note || "",
          createdBy: req.user.id,
          assignedTo: assignedTo || null,
          enquiry: req.params.id,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email")
      .populate("enquiry");

    res.json({ success: true, handled: doc });
  } catch (e) {
    next(e);
  }
});

router.get("/enquiries/:id/handled", async (req, res, next) => {
  try {
    const doc = await HandledEnquiry.findOne({ enquiry: req.params.id })
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
    const rx = q ? new RegExp(String(q).trim(), "i") : null;

    const all = await HandledEnquiry.find({})
      .populate("enquiry")
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    const filtered = rx
      ? all.filter((h) => {
          const e = h.enquiry || {};
          return (
            rx.test(h.note || "") ||
            rx.test(e.name || "") ||
            rx.test(e.email || "") ||
            rx.test(e.phone || "") ||
            rx.test(e.tentType || "")
          );
        })
      : all;

    const total = filtered.length;
    const start = (p - 1) * l;
    const pageItems = filtered.slice(start, start + l);

    res.json({
      success: true,
      items: pageItems,
      total,
      page: p,
      pages: Math.max(1, Math.ceil(total / l)),
      limit: l,
    });
  } catch (e) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});

router.delete("/enquiries/:id/handled", async (req, res, next) => {
  try {
    const enquiryId = req.params.id;

    const handledDoc = await HandledEnquiry.findOne({ enquiry: enquiryId });

    if (!handledDoc) {
      return res
        .status(404)
        .json({ success: false, error: "Enquiry is not marked as handled" });
    }

    if (handledDoc.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: "Forbidden: You did not mark this enquiry as handled.",
      });
    }

    await HandledEnquiry.findByIdAndDelete(handledDoc._id);

    res.json({ success: true });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
