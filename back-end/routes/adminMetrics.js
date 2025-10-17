const { Router } = require("express");
const { startOfMonth, subMonths, formatISO } = require("date-fns");
const mongoose = require("mongoose");
const { Parser } = require("json2csv");
const { protect } = require("../middleware/authMiddleware");

const Booking = require("../models/Bookings");
const Enquiry = require("../models/Enquiry");
const BlogPost = require("../models/BlogPost");
const HandledBooking = require("../models/HandledBookings");
const HandledEnquiry = require("../models/HandledEnquiries");
const User = require("../models/User");

const router = Router();
router.use(protect);

function lastNMonthsLabels(n = 12) {
  const labels = [];
  const today = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = subMonths(today, i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
    labels.push(key);
  }
  return labels;
}

async function buildMonthly(Model, labels, dateField = "createdAt") {
  const today = new Date();
  const oldest = startOfMonth(subMonths(today, 11));
  const rows = await Model.aggregate([
    { $match: { [dateField]: { $gte: oldest } } },
    {
      $group: {
        _id: {
          y: { $year: `$${dateField}` },
          m: { $month: `$${dateField}` },
        },
        count: { $sum: 1 },
      },
    },
  ]);
  const map = new Map();
  for (const r of rows) {
    const key = `${r._id.y}-${String(r._id.m).padStart(2, "0")}`;
    map.set(key, r.count);
  }
  return labels.map((k) => map.get(k) ?? 0);
}

async function computeMetrics() {
  const [totalBookings, totalEnquiries, totalBlogs, totalUsers] =
    await Promise.all([
      Booking.countDocuments({}),
      Enquiry.countDocuments({}),
      BlogPost.countDocuments({}),
      User.countDocuments({}),
    ]);

  const [handledBookingsCount, handledEnquiriesCount] = await Promise.all([
    HandledBooking.countDocuments({}),
    HandledEnquiry.countDocuments({}),
  ]);

  const blogAgg = await BlogPost.aggregate([
    {
      $group: {
        _id: null,
        views: { $sum: { $ifNull: ["$views", 0] } },
        likes: { $sum: { $ifNull: ["$likes", 0] } },
      },
    },
  ]);
  const totalBlogViews = blogAgg?.[0]?.views ?? 0;
  const totalBlogLikes = blogAgg?.[0]?.likes ?? 0;

  const labels = lastNMonthsLabels(12);
  const [bookingsMonthly, enquiriesMonthly] = await Promise.all([
    buildMonthly(Booking, labels, "createdAt"),
    buildMonthly(Enquiry, labels, "createdAt"),
  ]);

  const handledBookingsMonthly = await (async () => {
    const today = new Date();
    const oldest = startOfMonth(subMonths(today, 11));
    const rows = await HandledBooking.aggregate([
      { $match: { createdAt: { $gte: oldest } } },
      {
        $group: {
          _id: {
            y: { $year: "$createdAt" },
            m: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
    ]);
    const map = new Map();
    for (const r of rows) {
      const key = `${r._id.y}-${String(r._id.m).padStart(2, "0")}`;
      map.set(key, r.count);
    }
    return labels.map((k) => map.get(k) ?? 0);
  })();

  const conversionMonthly = labels.map((k, i) => {
    const enquiries = enquiriesMonthly[i] || 0;
    const handled = handledBookingsMonthly[i] || 0;
    const pct = enquiries > 0 ? Math.round((handled / enquiries) * 100) : 0;
    return { month: k, percent: pct, handled, enquiries };
  });

  const tentBreakdown = await Booking.aggregate([
    { $group: { _id: "$tentType", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]).then((rows) =>
    rows.map((r) => ({
      tentType: r._id || "Unknown",
      count: r.count,
    }))
  );

  const tagsTop = await BlogPost.aggregate([
    { $unwind: { path: "$tags", preserveNullAndEmptyArrays: false } },
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 },
  ]).then((rows) => rows.map((r) => ({ tag: r._id, count: r.count })));

  const recentBookings = await Booking.find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .select("firstName lastName email checkIn tents tentType createdAt");

  const recentEnquiries = await Enquiry.find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .select("name email checkIn persons rooms tentType createdAt");

  return {
    kpis: {
      totalBookings,
      totalEnquiries,
      handledBookingsCount,
      handledEnquiriesCount,
      totalBlogs,
      totalUsers,
      totalBlogViews,
      totalBlogLikes,
    },
    series: {
      labels,
      bookingsMonthly,
      enquiriesMonthly,
      conversionMonthly,
      tentBreakdown,
      tagsTop,
    },
    lists: {
      recentBookings,
      recentEnquiries,
    },
    generatedAt: formatISO(new Date()),
  };
}

router.get("/", async (_req, res) => {
  const empty = {
    kpis: {
      totalBookings: 0,
      totalEnquiries: 0,
      handledBookingsCount: 0,
      handledEnquiriesCount: 0,
      totalBlogs: 0,
      totalUsers: 0,
      totalBlogViews: 0,
      totalBlogLikes: 0,
    },
    series: {
      labels: [],
      bookingsMonthly: [],
      enquiriesMonthly: [],
      conversionMonthly: [],
      tentBreakdown: [],
      tagsTop: [],
    },
    lists: { recentBookings: [], recentEnquiries: [] },
    generatedAt: formatISO(new Date()),
  };

  try {
    const payload = await computeMetrics();

    res.json({
      ...empty,
      ...payload,
      kpis: { ...empty.kpis, ...(payload.kpis || {}) },
      series: { ...empty.series, ...(payload.series || {}) },
      lists: { ...empty.lists, ...(payload.lists || {}) },
      generatedAt: payload.generatedAt || empty.generatedAt,
    });
  } catch (e) {
    console.error("metrics error:", e);
    res.json(empty);
  }
});

router.get("/csv", async (_req, res) => {
  try {
    const payload = await computeMetrics();

    const parts = [];

    const kpiRows = Object.entries(payload.kpis).map(([k, v]) => ({
      metric: k,
      value: v,
    }));
    parts.push("# KPIs");
    parts.push(new Parser({ fields: ["metric", "value"] }).parse(kpiRows));

    const monthly = payload.series.labels.map((label, i) => ({
      month: label,
      bookings: payload.series.bookingsMonthly[i] ?? 0,
      enquiries: payload.series.enquiriesMonthly[i] ?? 0,
    }));
    parts.push("\n# Bookings vs Enquiries (monthly)");
    parts.push(
      new Parser({ fields: ["month", "bookings", "enquiries"] }).parse(monthly)
    );

    parts.push("\n# Conversion (handled vs enquiries)");
    parts.push(
      new Parser({
        fields: ["month", "percent", "handled", "enquiries"],
      }).parse(payload.series.conversionMonthly)
    );

    parts.push("\n# Tent Types");
    parts.push(
      new Parser({ fields: ["tentType", "count"] }).parse(
        payload.series.tentBreakdown
      )
    );

    parts.push("\n# Top Blog Tags");
    parts.push(
      new Parser({ fields: ["tag", "count"] }).parse(payload.series.tagsTop)
    );

    parts.push("\n# Recent Bookings");
    parts.push(
      new Parser({
        fields: [
          "firstName",
          "lastName",
          "email",
          "checkIn",
          "tents",
          "tentType",
          "createdAt",
        ],
      }).parse(payload.lists.recentBookings.map((r) => r.toObject?.() ?? r))
    );

    parts.push("\n# Recent Enquiries");
    parts.push(
      new Parser({
        fields: [
          "name",
          "email",
          "checkIn",
          "persons",
          "rooms",
          "tentType",
          "createdAt",
        ],
      }).parse(payload.lists.recentEnquiries.map((r) => r.toObject?.() ?? r))
    );

    const csv = parts.join("\n");
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="dashboard-metrics-${Date.now()}.csv"`
    );
    res.send(csv);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to export CSV" });
  }
});

router.get("/stream", async (req, res) => {
  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  res.flushHeaders?.();

  let closed = false;
  req.on("close", () => {
    closed = true;
    cleanup();
  });

  function sendEvent(event, data) {
    res.write(`event: ${event}\n`);
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }

  (async () => {
    try {
      const payload = await computeMetrics();
      sendEvent("metrics", payload);
    } catch (e) {
      sendEvent("error", { message: "initial compute failed" });
    }
  })();

  let watchers = [];
  let intervalId = null;

  function watchModel(Model, name) {
    try {
      const cs = Model.watch([], { fullDocument: "updateLookup" });
      cs.on("change", async () => {
        if (closed) return;
        try {
          const payload = await computeMetrics();
          sendEvent("metrics", payload);
          sendEvent("notification", {
            type: "change",
            source: name,
            ts: Date.now(),
          });
        } catch (e) {
          sendEvent("error", { message: "compute failed after change" });
        }
      });
      watchers.push(cs);
    } catch (e) {
      throw e;
    }
  }

  function startFallback() {
    intervalId = setInterval(async () => {
      if (closed) return;
      try {
        const payload = await computeMetrics();
        sendEvent("metrics", payload);
      } catch (e) {
        sendEvent("error", { message: "compute failed on interval" });
      }
    }, 15000);
  }

  try {
    watchModel(Booking, "bookings");
    watchModel(Enquiry, "enquiries");
    watchModel(HandledBooking, "handledBookings");
    watchModel(HandledEnquiry, "handledEnquiries");
    watchModel(BlogPost, "blogposts");
  } catch (_e) {
    startFallback();
  }

  function cleanup() {
    watchers.forEach((w) => {
      try {
        w.removeAllListeners();
        w.close();
      } catch {}
    });
    watchers = [];
    if (intervalId) clearInterval(intervalId);
  }
});

module.exports = router;
