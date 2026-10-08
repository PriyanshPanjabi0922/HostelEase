const express = require("express");

const {
  getVisitors,
  createVisitor,
  updateVisitor,
} = require("../controllers/visitorController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// Authenticated users can view visitors
router.get("/", protect, getVisitors);

// Only admin can manage visitors
router.post("/", protect, admin, createVisitor);
router.put("/:id", protect, admin, updateVisitor);

module.exports = router;
