const mongoose = require("mongoose");

const InstructorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    moreAbout: { type: String, required: true },
    pic: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Instructor", InstructorSchema);
