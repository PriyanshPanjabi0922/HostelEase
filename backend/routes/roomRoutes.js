const express = require("express");

const {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} = require("../controllers/roomController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// Any authenticated user can view rooms
router.get("/", protect, getRooms);

// Only admin can manage rooms
router.post("/", protect, admin, createRoom);
router.put("/:id", protect, admin, updateRoom);
router.delete("/:id", protect, admin, deleteRoom);

module.exports = router;
