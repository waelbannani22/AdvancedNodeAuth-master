
const express = require("express");
const router = express.Router();
const upload = require("../utils/upload");
const app = express();

app.use(express.json()) 

// Controllers
const {
  login,
  register,
  forgotPassword,
  resetPassword,
  uploadimage,
  findbyID,
  updateUser,
  passwordReset,
  updatefull,
  verifGoogle,
  registerGoogle,
  findbyEmail,
  updateUser1,
  isOfline,
  isOnline
} = require("../controllers/auth");
//routes
router.route("/register").post(register);

router.route("/login").post(login);

router.route("/isonline").post(isOnline);

router.route("/isoffline").post(isOfline);
router.route("/forgotpassword").post(forgotPassword);

router.route("/passwordreset/:resetToken").put(resetPassword);
router.route("/uploadimage").post(upload,uploadimage);
router.post("/uploadImage",upload,uploadimage);

router.route("/findbyid").post(findbyID);
router.post("/updateUser",upload,updateUser);
router.route("/resetpassword").post(passwordReset);
router.post("/updatefull",upload,updatefull);
router.post("/verifGoogle",verifGoogle);
router.route("/registerGoogle").post(registerGoogle);
router.route("/findbyemail").post(findbyEmail);
router.route("/updateUser1").post(updateUser1)
module.exports = router;
