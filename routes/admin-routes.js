const express = require("express");
const router = express.Router();
const upload = require("../utils/upload");
const app = express();

app.use(express.json()) 

const {
    login,
    register,
    FetchTeacher,
    acceptTeacher,
    refuseTeacher,
    FetchStatReel,
    FetchStudent,
    FetchStudentInXClass,
    banStudent,
    FetchTeachersocket
  } = require("../controllers/adminauth");
  
  const {
    fetchChart
  }= require ("../controllers/TeachersStats")
  //routes
  router.route("/register").post(register);
  
  router.route("/login").post(login);
  router.route("/fetchteacher").get(FetchTeacher);
  router.route("/acceptTeacher").post(acceptTeacher);
  router.route("/refuseTeacher").post(refuseTeacher);
  router.route("/fetchChart").get(fetchChart);
  router.route("/fetchStat").get(FetchStatReel);
  router.route("/fetchStudent").get(FetchStudent);
  router.route("/fetchStudentsInX").post(FetchStudentInXClass);
  router.route("/banStudent").post(banStudent);
  router.route("/fetchteachersockett").get(FetchTeachersocket);
  module.exports = router;