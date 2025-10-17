const mongoose = require("mongoose");

const EnquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    countryCode: { type: String, trim: true },
    phone: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    checkIn: { type: Date },
    persons: { type: Number, default: 1 },
    rooms: { type: Number, default: 1 },
    nights: { type: Number, default: 1 },
    tentType: { type: String, trim: true },
    remark: { type: String, trim: true },
    agree: { type: Boolean, default: false },
  },
  { timestamps: true }
);

EnquirySchema.index({ createdAt: -1 });
EnquirySchema.index({
  name: "text",
  email: "text",
  phone: "text",
  tentType: "text",
  remark: "text",
});

module.exports = mongoose.model("Enquiry", EnquirySchema);
