// routes/UserRouter.js
const express = require("express");
const router = express.Router();
const User = require("../Models/User");

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json({ users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Error fetching users", error: err });
  }
});

// routes/UserRouter.js
router.delete("/delete/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user and delete them
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Optional: Handle logout here (clear session or token)
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err });
  }
});

module.exports = router;
