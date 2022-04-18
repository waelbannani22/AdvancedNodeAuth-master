const express = require("express");
const router = express.Router();
const upload = require("../utils/upload");
const app = express();

app.use(express.json())
const {
    createNotification,
    findbyuser,
    markasread
} = require("../controllers/notificationsController");


router.route("/createnotification").post(createNotification);
router.route("/findbyuser").post(findbyuser);
router.route("/markasread").post(markasread);
module.exports = router;