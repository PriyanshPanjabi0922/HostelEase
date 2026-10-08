const express = require("express");

const {
  getNotices,
  createNotice,
  updateNotice,
} = require("../controllers/noticeController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// Authenticated users can view notices
router.get("/", protect, getNotices);

// Only admin can create/update notices
router.post("/", protect, admin, createNotice);
router.put("/:id", protect, admin, updateNotice);

module.exports = router;
