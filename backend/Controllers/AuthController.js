const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");

const signup = async (req, res) => {
  try {
    const { name, email, password, school, batch, roll, uniqueId, cls } =
      req.body;

    // Validate input fields
    if (
      !name ||
      !email ||
      !password ||
      !school ||
      !roll ||
      !batch ||
      !uniqueId ||
      !cls
    ) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please provide a valid email address.",
        success: false,
      });
    }

    // Check if password length is valid
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long.",
        success: false,
      });
    }

    // Check if user already exists by email
    const existingUserByEmail = await UserModel.findOne({ email });
    if (existingUserByEmail) {
      return res.status(409).json({
        message: "User already exists with this email. Please log in.",
        success: false,
      });
    }

    // Check if uniqueId already exists (if it's supposed to be unique)
    const existingUserByUniqueId = await UserModel.findOne({ uniqueId });
    if (existingUserByUniqueId) {
      return res.status(409).json({
        message:
          "A user with this unique ID already exists. Please use a different unique ID.",
        success: false,
      });
    }

    // Check if cls and roll are the same
    const existingUserByClsAndRoll = await UserModel.findOne({ cls, roll });
    if (existingUserByClsAndRoll) {
      return res.status(409).json({
        message:
          "A user with the same class and roll already exists. Please provide different roll or class.",
        success: false,
      });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      school,
      batch,
      roll, // Roll number can be the same now
      uniqueId,
      cls,
    });

    // Save the user to the database
    await newUser.save();

    return res.status(201).json({
      message: "Signup successful.",
      success: true,
    });
  } catch (err) {
    console.error("Signup error:", err.message || err);
    res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });
    const errorMsg = "Authentication failed. Invalid email or password.";

    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);

    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined.");
      return res.status(500).json({
        message: "Server configuration error.",
        success: false,
      });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful.",
      success: true,
      jwtToken,
      name: user.name,
      email: user.email,
      school: user.school,
      batch: user.batch,
      roll: user.roll,
      uniqueId: user.uniqueId,
      cls: user.cls,
    });
  } catch (err) {
    console.error("Login error:", err.message || err);
    res.status(500).json({
      message: "Internal server error during login.",
      success: false,
    });
  }
};

module.exports = {
  signup,
  login,
};
