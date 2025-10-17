const mongoose = require("mongoose");
const Handled = require("./HandledBookings");

const BookingSchema = new mongoose.Schema(
  {
    step: { type: Number, required: true, default: 1 },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },

    firstName: String,
    lastName: String,
    countryCode: String,
    phone: String,
    email: String,

    package: String,
    checkIn: String,
    persons: String,
    tents: String,
    tentType: String,
    tentAdults: [String],

    fullName: String,
    age: String,
    gender: String,
    paymentMode: String,
  },
  { timestamps: true }
);

BookingSchema.post("findOneAndDelete", async function (doc) {
  if (!doc) return;
  const HandledBooking = require("./HandledBookings");
  await HandledBooking.deleteMany({ booking: doc._id });
});

module.exports = mongoose.model("Booking", BookingSchema);
