const mongoose = require('mongoose');

const cycleSchema = new mongoose.Schema({
    selectedDate: { type: Date, required: true },
    cycleDays: { type: Number, required: true },
});


const Cycle = mongoose.model('Cycle', cycleSchema);
module.exports = Cycle;