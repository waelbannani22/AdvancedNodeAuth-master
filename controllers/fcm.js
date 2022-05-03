const express = require('express');

const app = express();
const admin = require('firebase-admin');
app.use(express.json())
exports.send = async (req, res, next) => {
    const message = {
        notification: {
            title: req.body.title,
            body: req.body.bdan
          },
        topic: "4sim2",
        
      };
      
      admin
        .messaging()
        .send(message)
        .then(response => {
          console.log('Successfully sent message:', response);
          return res.status(200)
        })
        .catch(error => {
          console.log('Error sending message:', error);
          return res.status(405)
        });
  };
  exports.sub = async (req, res, next) => {
    const registrationTokens = [
       req.body.token
      ];
      
      // Subscribe the devices corresponding to the registration tokens to the
      // topic.
    
      admin.messaging().subscribeToTopic(registrationTokens, req.body.class)
        .then((response) => {
          // See the MessagingTopicManagementResponse reference documentation
          // for the contents of response.
          console.log('Successfully subscribed to topic:', response);
        })
        .catch((error) => {
          console.log('Error subscribing to topic:', error);
        });
  };