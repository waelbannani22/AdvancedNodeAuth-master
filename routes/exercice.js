const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const exercice = require("../controllers/exercice-controller");

router.get('/',exercice.index)
router.post('/show',exercice.show)
router.post('/add',upload.single('pdfexercicename'),exercice.add)
router.post('/update',exercice.update)
router.post('/delete',exercice.destroy)
router.post('/findbycourse',exercice.findbycourse)
router.post('/addreport',exercice.addreport)
router.post('/allreports',exercice.findallreport)

module.exports = router