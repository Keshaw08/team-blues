const { Router } = require("express");
const { subDays } = require("date-fns");
const { protect } = require("../middleware/authMiddleware");

const Booking = require("../models/Bookings");
const Enquiry = require("../models/Enquiry");
const BlogPost = require("../models/BlogPost");

const router = Router();
router.use(protect);

router.get("/", async (_req, res) => {
  try {
    const since = subDays(new Date(), 1);
    const [newBookings, newEnquiries, newBlogs] = await Promise.all([
      Booking.find({ createdAt: { $gte: since } })
        .sort({ createdAt: -1 })
        .limit(10),
      Enquiry.find({ createdAt: { $gte: since } })
        .sort({ createdAt: -1 })
        .limit(10),
      BlogPost.find({ createdAt: { $gte: since } })
        .sort({ createdAt: -1 })
        .limit(10),
    ]);

    const notifications = [
      ...newBookings.map((b) => ({
        type: "booking",
        title: `New booking: ${b.firstName} ${b.lastName}`,
        at: b.createdAt,
        link: `/bookings?open=${b._id}`,
      })),
      ...newEnquiries.map((e) => ({
        type: "enquiry",
        title: `New enquiry: ${e.name}`,
        at: e.createdAt,
        link: `/enquiries?open=${e._id}`,
      })),
      ...newBlogs.map((p) => ({
        type: "blog",
        title: `New blog: ${p.title}`,
        at: p.createdAt,
        link: `/blog/${p._id}`,
      })),
    ].sort((a, b) => new Date(b.at) - new Date(a.at));

    res.json({ notifications });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

module.exports = router;
