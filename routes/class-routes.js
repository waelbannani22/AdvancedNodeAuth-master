const express = require("express");
const router = express.Router();
const upload = require("../utils/upload");
const app = express();

app.use(express.json()) 

const {
    
    createClass,
    assignStudentToClass,
    getClasses,
    assignTeacherToclass,
    getClassesTeacher,
    getTeachersInclass,
    getclass
  } = require("../controllers/classControlller");
  //routes
  router.route("/createclass").post(createClass);
  router.route("/assign").post(assignStudentToClass);
  router.route("/getclasses").get(getClasses);
  router.route("/assignTeacher").post(assignTeacherToclass);
  router.route("/getclassesteacher").post(getClassesTeacher);
  router.route("/getteacherinclass").post(getTeachersInclass);
  router.route("/getclass").post(getclass);
  
  module.exports = router;