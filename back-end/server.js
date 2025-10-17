const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const bookingsRoutes = require("./routes/bookings");
const handledRoutes = require("./routes/handled");

const blogsRoutes = require("./routes/blogs");
const uploadRoutes = require("./routes/upload");

const enquiriesRoutes = require("./routes/enquiries");
const handledEnquiriesRoutes = require("./routes/handledEnquiries");

const adminMetricsRoutes = require("./routes/adminMetrics");
const adminNotificationsRoutes = require("./routes/adminNotifications");
const adminSearchRoutes = require("./routes/adminSearch");

const handledStatsRoutes = require("./routes/handledStats");

const app = express();

const allowedOrigins = [
  "https://admin.rannutsavpackage.com",
  "https://www.admin.rannutsavpackage.com",
  "https://rannutsavpackage.com",
  "https://www.rannutsavpackage.com",
  "http://localhost:5100",
  "http://localhost:5300",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "10mb" }));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

connectDB();

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/bookings", bookingsRoutes);
app.use("/api/handled", handledRoutes);

app.use("/api/blogs", blogsRoutes);
app.use("/api/uploads", uploadRoutes);

app.use("/api/enquiries", enquiriesRoutes);
app.use("/api/handled-enquiries", handledEnquiriesRoutes);

app.use("/api/admin/metrics", adminMetricsRoutes);
app.use("/api/admin/notifications", adminNotificationsRoutes);
app.use("/api/admin/search", adminSearchRoutes);

app.use("/api/handled/stats", handledStatsRoutes);

app.get("/", (req, res) => {
  res.send("Rann Utsav Admin API is running...");
});

const PORT = process.env.PORT || 5200;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
