const express = require("express");
const router = express.Router();
const multer = require("multer");
const Instructor = require("../models/Instructor"); // Import the Instructor model

// Set up Multer for handling image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Add a new instructor
router.post("/add", upload.single("pic"), async (req, res) => {
  try {
    const newInstructor = new Instructor({
      name: req.body.name,
      specialty: req.body.specialty,
      moreAbout: req.body.moreAbout,
      pic: req.file
        ? {
            data: req.file.buffer,
            contentType: req.file.mimetype,
          }
        : null,
    });

    await newInstructor.save();
    res.status(200).json({ message: "Instructor added successfully!" });
  } catch (err) {
    console.error("Error saving instructor data", err);
    res.status(500).json({ message: "Error saving instructor data" });
  }
});

// Fetch all instructors
router.get("/all", async (req, res) => {
  try {
    const instructors = await Instructor.find().sort({ createdAt: -1 });
    res.status(200).json(instructors);
  } catch (err) {
    console.error("Error fetching instructors", err);
    res.status(500).json({ message: "Error fetching instructors" });
  }
});

// Fetch an instructor's profile picture by ID
router.get("/file/:id", async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);

    if (!instructor || !instructor.pic) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.contentType(instructor.pic.contentType);
    res.send(instructor.pic.data);
  } catch (err) {
    console.error("Error fetching instructor image", err);
    res.status(500).json({ message: "Error fetching instructor image" });
  }
});

// Delete an instructor by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const deletedInstructor = await Instructor.findByIdAndDelete(id);
    if (!deletedInstructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    res.status(200).json({ message: "Instructor deleted successfully!" });
  } catch (err) {
    console.error("Error deleting instructor:", err);
    res.status(500).json({ message: "Error deleting instructor" });
  }
});

module.exports = router;
