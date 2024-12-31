const mongoose = require("mongoose");

const adminDataSchema = new mongoose.Schema({
  name: String,
  text: String,
  file: {
    data: Buffer,
    contentType: String,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the creation time
  },
});

const AdminData = mongoose.model("AdminData", adminDataSchema);

module.exports = AdminData;
