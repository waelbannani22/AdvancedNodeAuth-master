const crypto = require("crypto");
const express = require('express');
const bcrypt = require("bcryptjs");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const upload = require("../utils/upload");
const admin = require("../models/admin");
const Classe = require("../models/Classe");
const app = express();

app.use(express.json())

exports.assignStudentToClass = async (req, res, next) => {
    const {idClasse,listId} = req.body;
    var x = 0; 
    var i=0;
   // var listId = ["6223f4d80a0e35491c0f2dd4"]
    listId.forEach( async element =>   {
      try {
     
      const student = await User.find({
        
        _id : element,
        
      });
      //console.log(student)
      const classes = await Classe.find({
        
        _id : idClasse,
        members : {$in : Array(student)}
        
      });
      console.log(classes)
      var x =classes.length
     // console.log(x.length);
    
      if (x== 0)
      {
        const clas = await Classe.findOne({
        
            _id : idClasse,
           
            
          });
        if (clas.members == []){
            clas.members = (student)
        }else{
            clas.members.push(student)
        }
        console.log(student[i]._id)
        const us =  await User.find({_id : student[i]._id})
        console.log(us)
        User.findOneAndUpdate({_id :student[i]._id}, {status : "affected"}).exec();
        await clas.save();
        i++
        console.log("success")
        res.status(200).json({
          success: true,
          data: "added to this class",
        });
      }
      else if (x!=0)
      {
        return next(new ErrorResponse(student[i].firstname+" already added to this class", 401));
        i++
      }
   
    
    
      
     
    } catch (err) {
      console.log("failure")
      next(err);
    }
    });
    
  };
  exports.createClass = async (req, res, next) => {
    const {className} = req.body;
    try {
     
      const classe = await Classe.create({
        
        className : className,
        members : []
        
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