const express = require("express");
const { v2: cloudinary } = require("cloudinary");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { protect } = require("../middleware/authMiddleware");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "rann-utsav/blogs",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ quality: "auto", fetch_format: "auto" }],
  },
});
const upload = multer({ storage });
const router = express.Router();
router.use(protect);

router.post("/image", upload.single("image"), async (req, res) => {
  res.json({ url: req.file.path, publicId: req.file.filename });
});

router.post("/images", upload.array("images", 10), async (req, res) => {
  const files = (req.files || []).map((f) => ({
    url: f.path,
    publicId: f.filename,
  }));
  res.json({ files });
});

router.delete("/image/:publicId", async (req, res) => {
  try {
    await cloudinary.uploader.destroy(req.params.publicId);
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

module.exports = router;
