const express = require("express");
const router = express.Router();
const multer = require("multer");
const AdminData = require("../Models/Administrator");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Add a new notice
router.post("/add", upload.single("file"), async (req, res) => {
  try {
    const newAdminData = new AdminData({
      name: req.body.name,
      text: req.body.text,
      file: req.file
        ? {
            data: req.file.buffer,
            contentType: req.file.mimetype,
          }
        : null,
    });

    await newAdminData.save();
    res.status(200).json({ message: "Notice added successfully!" });
  } catch (err) {
    console.error("Error saving data to the database", err);
    res.status(500).json({ message: "Error saving data to the database" });
  }
});

// Fetch all notices
router.get("/data", async (req, res) => {
  try {
    const adminData = await AdminData.find().sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json(adminData);
  } catch (err) {
    res.status(500).json({ message: "Error fetching data" });
  }
});

// Fetch a file by ID
router.get("/file/:id", async (req, res) => {
  try {
    const adminData = await AdminData.findById(req.params.id);

    if (!adminData || !adminData.file) {
      return res.status(404).json({ message: "File not found" });
    }

    res.contentType(adminData.file.contentType);
    res.send(adminData.file.data);
  } catch (err) {
    console.error("Error fetching file", err);
    res.status(500).json({ message: "Error fetching file" });
  }
});

// Delete a notice by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedNotice = await AdminData.findByIdAndDelete(req.params.id);
    if (!deletedNotice) {
      return res.status(404).json({ message: "Notice not found" });
    }
    res.status(200).json({ message: "Notice deleted successfully!" });
  } catch (err) {
    console.error("Error deleting notice", err);
    res.status(500).json({ message: "Error deleting notice" });
  }
});

module.exports = router;
