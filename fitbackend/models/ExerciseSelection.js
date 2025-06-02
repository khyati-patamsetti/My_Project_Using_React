const mongoose = require("mongoose");
const ExerciseSelectionSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  selectedExercises: { type: [Number], required: true }, // Array of exercise IDs selected by the user
});

module.exports = mongoose.model("ExerciseSelection", ExerciseSelectionSchema);