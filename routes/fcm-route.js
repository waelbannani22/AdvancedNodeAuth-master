const express = require('express')
const router = express.Router()
const {
    send,
    sub
} = require('../controllers/fcm')
router.route("/send").post(send);
router.route("/sub").post(sub);
module.exports = router