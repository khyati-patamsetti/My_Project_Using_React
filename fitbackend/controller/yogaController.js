const YogaSelection = require("../models/YogaSelection");

const saveSelectedYogas = async (req, res) => {
  const { username, selectedYogas } = req.body;

  try {
    const result = await YogaSelection.findOneAndUpdate(
      { username },
      { $set: { selectedYogas } }, // Set the selected yogas
      { new: true, upsert: true } // Create new entry if it doesn’t exist
    );

    res.status(200).json({ message: "Selected yogas saved successfully.", data: result });
  } catch (error) {
    console.error("Error saving selected yogas:", error);
    res.status(500).json({ message: "Failed to save selected yogas.", error });
  }
};

module.exports = { saveSelectedYogas };
