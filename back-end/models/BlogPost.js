const { Schema, model } = require("mongoose");
const slugify = require("slugify");
const { customAlphabet } = require("nanoid");
const nano = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 6);

const ImageSchema = new Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { _id: false }
);

const BlogPostSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    slug: { type: String, unique: true, index: true },
    imageUrl: { type: String, default: "" },
    images: { type: [ImageSchema], default: [] },
    content: { type: String, required: true },
    tags: [{ type: String }],
    published: { type: Boolean, default: true },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

BlogPostSchema.pre("validate", async function (next) {
  if ((!this.slug || this.isModified("title")) && this.title) {
    const base = slugify(this.title, { lower: true, strict: true }) || "post";
    let candidate = base;
    let exists = await this.constructor.findOne({ slug: candidate });
    while (exists && exists._id.toString() !== this._id?.toString()) {
      candidate = `${base}-${nano()}`;
      exists = await this.constructor.findOne({ slug: candidate });
    }
    this.slug = candidate;
  }
  next();
});

module.exports = model("BlogPost", BlogPostSchema);
