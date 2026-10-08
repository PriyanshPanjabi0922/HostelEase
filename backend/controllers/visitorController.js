const Visitor = require("../models/Visitor");

// Get all visitors
const getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find();
    res.json(visitors);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch visitors",
    });
  }
};

// Create a new visitor
const createVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.create(req.body);

    res.status(201).json(visitor);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create visitor",
      error: error.message,
    });
  }
};

// Update a visitor
const updateVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!visitor) {
      return res.status(404).json({
        message: "Visitor not found",
      });
    }

    res.json(visitor);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update visitor",
      error: error.message,
    });
  }
};

module.exports = {
  getVisitors,
  createVisitor,
  updateVisitor,
};
