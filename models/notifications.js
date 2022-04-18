const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  title: {
    type: String,
   
  },
  description: {
    type: String,
  
  },
  isUnRead: {
    type: Boolean,
   
  },
  createdAt: {
    type: String,
   
  },
  type: {
    type: String,
   
  },
  user: {
    type: String,
   
  },
});

module.exports = mongoose.model("Notifications", NotificationSchema);