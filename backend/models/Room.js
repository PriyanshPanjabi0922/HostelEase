const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      required: true,
      unique: true,
    },

    floor: {
      type: Number,
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
    },

    occupied: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Available", "Occupied", "Maintenance"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
