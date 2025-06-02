const mongoose = require("mongoose");
const MeditationSelectionSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  selectedMeditations: { type: [Number], required: true }, // Array of exercise IDs selected by the user
});

module.exports = mongoose.model("MeditationSelection", MeditationSelectionSchema);
