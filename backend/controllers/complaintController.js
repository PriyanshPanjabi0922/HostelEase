const Complaint = require("../models/Complaint");

// Get all complaints
const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch complaints",
    });
  }
};

// Create a new complaint
const createComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.create(req.body);

    res.status(201).json(complaint);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create complaint",
      error: error.message,
    });
  }
};

// Update a complaint
const updateComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      returnDocument: "after",
      runValidators: true,
    }
  );

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    res.json(complaint);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update complaint",
      error: error.message,
    });
  }
};

module.exports = {
  getComplaints,
  createComplaint,
  updateComplaint,
};
