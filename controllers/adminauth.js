const crypto = require("crypto");
const express = require('express');
const bcrypt = require("bcryptjs");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const upload = require("../utils/upload");
const admin = require("../models/admin");
const TeacherStat = require("../models/teacherStat");
const app = express();

app.use(express.json())

exports.login = async (req, res, next) => {
  const { id, password } = req.body;

  // Check if email and password is provided
  if (!id || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
    // Check that user exists by email
    const user = await admin.findOne({ _id: id, password: password })

    if (!user) {
      console.log("failure")
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Check that password match



    console.log("success")
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
exports.register = async (req, res, next) => {
  const password = "admin12345"
  const fullname = "admin"
  const role = "admin"
  try {

    const user = await admin.create({
      fullname,
      password,
      role

    });
    console.log("success")
    res.status(201).json({
      success: true,
      data: "admin created",
    });
  } catch (err) {
    console.log("failure")
    next(err);
  }
};
exports.FetchTeacher = async (req, res, next) => {

  try {

    const teachers = await User.find({

      role: "teacher",

    });
    console.log("success")
    res.status(200).json({
      success: true,
      data: teachers,
    });
  } catch (err) {
    console.log("failure")
    next(err);
  }
};
exports.acceptTeacher = async (req, res, next) => {
  const { idTeacher } = req.body;
  try {

    const teachers = await User.findOne({

      _id: idTeacher,
      

    });
    if (teachers.verified === true) {
     
      const stat = await TeacherStat.findOne({});
      console.log(stat)
      return res.status(200).json({
        success: true,
        data: teachers.firstname + " " + teachers.lastname + " is already verified",
      });
    }
    if (teachers) {
      const stat = await TeacherStat.findOne({});
      console.log(stat)
      if (stat === null){
        const user = await TeacherStat.create({
          statName: "teachers statistics",
          nbAccepted: 0,
          nbRefused:0
    
        });
        console.log(user)
      }else{
        TeacherStat.findOneAndUpdate({_id :stat._id}, {$inc : { nbAccepted : 1}}).exec();
      }
      teachers.verified = true;
      await teachers.save();
      console.log("success", teachers)
      res.status(200).json({
        success: true,
        data: teachers.firstname + " " + teachers.lastname + " is now  verified",
      });
    }else{
      return next(new ErrorResponse("Invalid id", 401));
    }

  } catch (err) {
    console.log("failure")
    next(err);
  }
};
exports.refuseTeacher = async (req, res, next) => {
  const { idTeacher } = req.body;
  try {

    const teachers = await User.findOne({
      _id: idTeacher,
    });
    if (teachers.verified === true) {
     
      const stat = await TeacherStat.findOne({});
      console.log(stat)
      return res.status(200).json({
        success: true,
        data: teachers.firstname + " " + teachers.lastname + " is already verified",
      });
    }
    if (teachers) {
      const stat = await TeacherStat.findOne({});
      console.log(stat)
      if (stat === null){
        const user = await TeacherStat.create({
          statName: "teachers statistics",
          nbAccepted: 0,
          nbRefused:0
    
        });
        console.log(user)
      }else{
        TeacherStat.findOneAndUpdate({_id :stat._id}, {$inc : { nbRefused : 1}}).exec();
      }
      await User.deleteOne({_id:idTeacher})
      
      
      console.log("success", teachers)
      res.status(200).json({
        success: true,
        data: teachers.firstname + " " + teachers.lastname + " is now  refused from being a teacher in our University",
      });
    }else{
      return next(new ErrorResponse("Invalid id", 401));
    }

  } catch (err) {
    console.log("failure")
    next(err);
  }
};