const ExerciseSelection = require("../models/ExerciseSelection");

const saveSelectedExercises = async (req, res) => {
  const { username, selectedExercises } = req.body;

  try {
    const result = await ExerciseSelection.findOneAndUpdate(
      { username },
      { $set: { selectedExercises} }, // Set the selected yogas
      { new: true, upsert: true } // Create new entry if it doesn’t exist
    );

    res.status(200).json({ message: "Selected exercises saved successfully.", data: result });
  } catch (error) {
    console.error("Error saving selected exercises:", error);
    res.status(500).json({ message: "Failed to save selected exercises.", error });
  }
};

const getSelectedExercises = async (req, res) => {
  const { username } = req.params; 

  try {
      const result = await ExerciseSelection.findOne({ username });
      if (!result) {
          return res.status(404).json({ message: "User not found." });
      }
      res.status(200).json(result.selectedExercises); 
  } catch (error) {
      console.error("Error fetching selected exercises:", error);
      res.status(500).json({ message: "Failed to fetch selected exercises.", error });
  }
};

module.exports = { saveSelectedExercises, getSelectedExercises };