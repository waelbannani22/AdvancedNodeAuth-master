const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const resourceController = require('../controllers/resourceController')
router.get('/',resourceController.index)
router.post('/show',resourceController.show)
router.post('/add',upload.single('pdfname'),resourceController.add)

router.post('/update',resourceController.update)
router.post('/delete',resourceController.destroy)
router.post('/findbylesson',resourceController.findbyLesson)
router.post('/uploadres',resourceController.fileup)
module.exports = router