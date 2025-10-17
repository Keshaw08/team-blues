const mongoose = require("mongoose");

const HandledEnquirySchema = new mongoose.Schema(
  {
    enquiry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Enquiry",
      required: true,
    },
    note: { type: String, trim: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

HandledEnquirySchema.index({ enquiry: 1 }, { unique: true });

module.exports =
  mongoose.models.HandledEnquiry ||
  mongoose.model("HandledEnquiry", HandledEnquirySchema);
