const express = require('express');
const notifications = require('../models/notifications');
const app = express();

app.use(express.json())

exports.createNotification = async (req, res, next) => {
    const {title,description,type,user,users,createdAt,motif} = req.body;
    try {
     
      const noti = await  notifications.create({
        
        title : title,
        description : description,
        createdAt:createdAt,
        type:type,
        isUnRead : true,
      
        users:users,
        motif:motif
        
      });
      console.log("success")
      res.status(200).json({
        success: true,
        data: noti,
      });
    } catch (err) {
      console.log("failure")
      next(err);
    }
  };
  exports.findbyuser = async (req, res, next) => {
    const {user} = req.body;
    try {
     
      const noti = await  notifications.find({
          users : {$in:user}
      }).sort({"updatedAt":-1});
     if ( noti){
        res.status(200).json({
            success: true,
            data: noti,
          });
     }else{
          res.status(404).json({
        success: false,
        data: null,
      });
     }
      
    } catch (err) {
      console.log("failure")
      next(err);
    }
  };
  exports.markasread = async (req, res, next) => {
    const {idd} = req.body;
    try {
     
      const noti = await  notifications.findOne({
           _id:idd
      });
     if ( noti){
         noti.isUnRead = false
        await  noti.save()
        res.status(200).json({
            success: false,
            data: noti,
          });
     }else{
          res.status(404).json({
        success: false,
        data: null,
      });
     }
      
    } catch (err) {
      console.log("failure")
      next(err);
    }
  };