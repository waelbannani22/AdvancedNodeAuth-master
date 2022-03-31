const express = require("express");
const router = express.Router();
const { catchErrors } = require("../handlers/errorHandlers");
const chatroomController = require("../controllers/chatroomController");

const auth = require("../middleware/auth");

const {
    getAllChatrooms,
    createChatroom
    
  } = require("../controllers/chatroomController");
  //routes
  router.route("/createChatroom").post(createChatroom);
  router.route("/getAllChatrooms").get(getAllChatrooms);


module.exports = router;