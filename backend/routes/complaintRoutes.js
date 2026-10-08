const express = require("express");

const {
  getComplaints,
  createComplaint,
  updateComplaint,
} = require("../controllers/complaintController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// Authenticated users can view complaints
router.get("/", protect, getComplaints);

// Authenticated users can create complaints
router.post("/", protect, createComplaint);

// Only admin can update complaint status
router.put("/:id", protect, admin, updateComplaint);

module.exports = router;
