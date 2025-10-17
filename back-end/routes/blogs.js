const express = require("express");
const BlogPost = require("../models/BlogPost");
const { v2: cloudinary } = require("cloudinary");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
// router.use(protect);

router.post("/", protect, async (req, res) => {
  try {
    const {
      title,
      content,
      images = [],
      imageUrl = "",
      tags = [],
      published = true,
    } = req.body;
    const doc = await BlogPost.create({
      title,
      content,
      images,
      imageUrl,
      tags,
      published,
    });
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, q = "", published } = req.query;
    const filter = {};
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } },
        { tags: { $regex: q, $options: "i" } },
      ];
    }
    if (published === "true") filter.published = true;
    if (published === "false") filter.published = false;

    const cursor = BlogPost.find(filter)
      .sort({ createdAt: -1 })
      .skip((+page - 1) * +limit)
      .limit(+limit);

    const [items, total] = await Promise.all([
      cursor,
      BlogPost.countDocuments(filter),
    ]);
    res.json({ items, total, page: +page, pages: Math.ceil(total / +limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/slug/:slug", async (req, res) => {
  try {
    const post = await BlogPost.findOneAndUpdate(
      { slug: req.params.slug, published: true },
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: "Not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", protect, async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:id", protect, async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!post) return res.status(404).json({ message: "Not found" });
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Not found" });

    const publicIds = (post.images || [])
      .map((i) => i.publicId)
      .filter(Boolean);
    if (post.imageUrl && !publicIds.length) {
      // if you used single image legacy storage, optionally derive publicId;
    }

    await Promise.all(
      publicIds.map((pid) => cloudinary.uploader.destroy(pid).catch(() => null))
    );

    await BlogPost.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/:id/like", async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!post) return res.status(404).json({ message: "Not found" });
    res.json({ likes: post.likes });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
