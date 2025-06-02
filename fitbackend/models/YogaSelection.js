const mongoose = require("mongoose");

const YogaSelectionSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  selectedYogas: { type: [Number], required: true },
});

module.exports = mongoose.model("YogaSelection", YogaSelectionSchema);
