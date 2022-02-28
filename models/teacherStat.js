const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./User");

const TeacherStatt = new mongoose.Schema({
    statName:{
        type:String,
        required: false,
          
    } ,
  nbAccepted:{
      type:Number,
      required: false,
        
  } ,
  nbRefused:{
    type:Number,
    required: false,
      
} 
    
});


const TeacherStat = mongoose.model("TeacherStatt", TeacherStatt);

module.exports = TeacherStat;
