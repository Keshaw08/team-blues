const { Router } = require("express");
const { protect } = require("../middleware/authMiddleware");
const Booking = require("../models/Bookings");
const Enquiry = require("../models/Enquiry");
const BlogPost = require("../models/BlogPost");

const router = Router();
router.use(protect);

router.get("/", async (req, res) => {
  try {
    const q = (req.query.q || "").toString().trim();
    if (!q) return res.json({ q, bookings: [], enquiries: [], posts: [] });

    const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");

    const [bookings, enquiries, posts] = await Promise.all([
      Booking.find({
        $or: [
          { firstName: regex },
          { lastName: regex },
          { email: regex },
          { tentType: regex },
          { package: regex },
        ],
      })
        .limit(8)
        .select("firstName lastName email tentType package checkIn _id"),
      Enquiry.find({
        $or: [{ name: regex }, { email: regex }, { tentType: regex }],
      })
        .limit(8)
        .select("name email tentType checkIn _id"),
      BlogPost.find({
        $or: [{ title: regex }, { tags: regex }, { slug: regex }],
      })
        .limit(8)
        .select("title slug _id"),
    ]);

    res.json({ q, bookings, enquiries, posts });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Search failed" });
  }
});

module.exports = router;
