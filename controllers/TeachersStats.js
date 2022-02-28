const crypto = require("crypto");
const express = require('express');
const bcrypt = require("bcryptjs");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const upload = require("../utils/upload");
const admin = require("../models/admin");
const Classe = require("../models/Classe");
const TeacherStat = require("../models/teacherStat");
const app = express();

app.use(express.json())

exports.fetchChart = async (req, res, next) => {
    
    try {
     
      const classe = await TeacherStat.findOne({
        

      });
      console.log("success")
      res.status(200).json({
        success: true,
        data: classe,
      });
    } catch (err) {
      console.log("failure")
      next(err);
    }
  };