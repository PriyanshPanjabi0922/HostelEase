const Notice = require("../models/Notice");

// Get all notices
const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find();
    res.json(notices);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch notices",
    });
  }
};

// Create a new notice
const createNotice = async (req, res) => {
  try {
    const notice = await Notice.create(req.body);

    res.status(201).json(notice);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create notice",
      error: error.message,
    });
  }
};

// Update a notice
const updateNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!notice) {
      return res.status(404).json({
        message: "Notice not found",
      });
    }

    res.json(notice);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update notice",
      error: error.message,
    });
  }
};

module.exports = {
  getNotices,
  createNotice,
  updateNotice,
};
