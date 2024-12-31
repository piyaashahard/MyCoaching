const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  school: { type: String, required: true },
  batch: { type: String, required: true },
  roll: { type: String, required: true }, // Roll can now be repeated
  uniqueId: { type: Number, required: true, unique: true },
  cls: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
