const express = require('express');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  gender: { type : String},
  goal: { type: String },
  focus: { type: String },
  height: { type: Number },
  weight: { type: Number },
});
const User = mongoose.model('User',userSchema);
module.exports = User; 