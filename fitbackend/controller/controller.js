const express = require("express");
const bodyparser = require("body-parser");
const credentials = require("../models/models");
const User = require("../models/user");


const getData = async (req, res) => {
  try {
    const data = req.body;
    console.log("Received Data:", data);
    
    const existingUser = await credentials.findOne({
      $or: [{ email: data.email }, { username: data.username }]
    });

    if (existingUser) {
      return res.status(200).json({ exists: true }); 
    }
    
    await credentials.create(data);
    return res.status(200).json({ message: "Data Added Successfully" });
  } catch (err) {
    console.error("Error in getData:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const checkData = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await credentials.findOne({ email, password });
    
    if (user) {
      return res.status(200).json({ message: "Valid User", username: user.username });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Error in checkData:", err);
    return res.status(500).json({ message: "Server Error", error: err });
  }
};

const userData = async (req, res) => {
  const { username, data } = req.body;
  console.log("Received data:", { username, data });

  try {
    const user = await User.findOneAndUpdate(
      { username },
      { $set: { ...data } },
      { upsert: true, new: true } 
    );

    if (user) {
      console.log("User after update:", user);
      res.status(200).json({ message: 'User data saved successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error saving user data', error });
  }
};
const getuserData = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user data', error });
  }
};
exports.getData = getData;
exports.checkData = checkData;
exports.getuserData = getuserData;
exports.userData = userData;