require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const roomRoutes = require("./routes/roomRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const visitorRoutes = require("./routes/visitorRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");


const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use("/api/rooms", roomRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/visitors", visitorRoutes);

app.get("/", (req, res) => {
  res.send("HostelEase Backend is Running!");
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
