const crypto = require("crypto");
const express = require('express');
const bcrypt = require("bcryptjs");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const upload = require("../utils/upload");
const admin = require("../models/admin");
const TeacherStat = require("../models/teacherStat");
const Classe = require("../models/Classe");
const app = express();

app.use(express.json())

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password is provided
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
    // Check that user exists by email
    const user = await admin.findOne({ email: email, password: password })

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
  const email = "allwebsiteinone@gmail.com"

  try {

    const user = await admin.create({
      fullname,
      password,
      role,
      email

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
exports.FetchStudent = async (req, res, next) => {

  try {

    const teachers = await User.find({

      role: "student",
      status : "pending"
      
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
exports.FetchStudentInXClass = async (req, res, next) => {
const {idClasse}= req.body;
var err = []
var i = 0
  try {

    const classe = await Classe.findOne({

     _id: idClasse 
      
    });
    classe.members.forEach(e=>{
      e.find(function(el){
        err[i] = el
        i++
      })
    })
    console.log(classe.members)
    console.log("success")
    res.status(200).json({
      success: true,
      data: err,
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
      sendEmail(teachers.email,"your application to become a teacher","hey ,you're now verified")
      teachers.verified = true;
      teachers.status = "accepted"
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
        teachers.verified = false
        teachers.status = "refused"
        TeacherStat.findOneAndUpdate({_id :stat._id}, {$inc : { nbRefused : 1}}).exec();
      }
      sendEmail(teachers.email,"your application to become a teacher","hey sorry, you have been banned (due to security issues")
      //await User.deleteOne({_id:idTeacher})
      
      await teachers.save();
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
exports.FetchStatReel = async (req, res, next) => {
  
  //init 
  var nbAccepted = 0
  var nbRefused = 0
  var nbPending = 0
  //search
  try {

    const teachers = await User.find({

      role: "teacher",
      
    });
    if (teachers){
      teachers.forEach(teach =>{
      if (teach.status == "accepted"){
        nbAccepted++;
      }else if (teach.status == "refused"){
        nbRefused++;
      }else{
        nbPending ++;
      }
      
    });
    res.status(200).json({
      success: true,
      data: [{"nbAccepted":nbAccepted,"nbRefused":nbRefused,"nbPending":nbPending}],
    });
    }else{
      return next(new ErrorResponse("no stat available", 401));
    }
    
  

  } catch (err) {
    console.log("failure")
    next(err);
  }
};
function arrayRemove(arr, value) { 
    
  return arr.filter(function(ele){ 
      return ele != value; 
  });
}
exports.banStudent = async (req, res, next) => {
  const { idClasse,idStudent } = req.body;
  try {

    const classe = await Classe.findOne({
      _id: idClasse,
    });
    //console.log(classe.members )
    classe.members.forEach(async element =>{
     const user=  element.find(el => el._id == idStudent)
     var z = classe.members.indexOf(element)
     if (user && z > -1){
      //console.log(classe.members)
      
     var x = classe.members.indexOf(user)
      console.log(z)
      classe.members.splice(z,1)
      
      
      classe.save();
      res.status(200).json({
        success: true,
        data: classe,
      });
     }
     
     
     
    })
    
   

  } catch (err) {
    console.log("failure")
    next(err);
  }
};
exports.FetchTeachersocket = async (req, res, next) => {

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