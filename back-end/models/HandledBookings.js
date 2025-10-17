const mongoose = require("mongoose");

const HandledBookingSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
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

HandledBookingSchema.index({ booking: 1 }, { unique: true });

module.exports =
  mongoose.models.HandledBooking ||
  mongoose.model("HandledBookings", HandledBookingSchema);
