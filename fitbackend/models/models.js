const express = require('express');
const mongoose =  require('mongoose');

const credentials = new mongoose.Schema(
    {
        username : {
            type : String,
            required: true
        }, 
    
        email: {
            type : String,
            required: true
        },
        password :{
            type:String,
            required: true
        }
    }
);
module.exports = mongoose.model("credentials", credentials)