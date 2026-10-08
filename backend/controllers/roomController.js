const Room = require("../models/Room");

// Get all rooms
const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch rooms",
    });
  }
};

// Create a new room
const createRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);

    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create room",
      error: error.message,
    });
  }
};

// Update a room
const updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
  returnDocument: "after",
  runValidators: true,
  });

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    res.json(room);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update room",
      error: error.message,
    });
  }
};

// Delete a room
const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    res.json({
      message: "Room deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete room",
      error: error.message,
    });
  }
};

module.exports = {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
};
