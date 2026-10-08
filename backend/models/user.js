const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
    },

    room: {
      type: String,
    },

    course: {
      type: String,
    },

    year: {
      type: String,
    },

    guardian: {
      type: String,
    },

    guardianPhone: {
      type: String,
    },

    joined: {
      type: String,
    },

    address: {
      type: String,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
