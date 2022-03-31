const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const CourseController = require("../controllers/course-controller");

router.get('/',CourseController.index)
router.post('/show',CourseController.show)
router.post('/add',upload.single('idPhoto'),CourseController.add)
router.post('/update',CourseController.update)
router.post('/delete',CourseController.destroy)

module.exports = router