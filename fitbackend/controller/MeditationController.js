const MeditationSelection = require("../models/MeditationSelection");

const saveSelectedMeditations = async (req, res) => {
  const { username, selectedMeditations } = req.body;

  try {
    const result = await MeditationSelection.findOneAndUpdate(
      { username },
      { $set: { selectedMeditations } }, // Set the selected yogas
      { new: true, upsert: true } // Create new entry if it doesn’t exist
    );

    res.status(200).json({ message: "Selected Meditations saved successfully.", data: result });
  } catch (error) {
    console.error("Error saving selected Meditations:", error);
    res.status(500).json({ message: "Failed to save selected Meditations.", error });
  }
};

module.exports = { saveSelectedMeditations };
