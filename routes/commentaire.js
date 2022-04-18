const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const commantaire = require("../controllers/commentaire");

router.get('/',commantaire.index)
router.post('/show',commantaire.show)
router.post('/add',upload.single('commantaire'),commantaire.add)
router.post('/update',commantaire.update)
router.post('/delete',commantaire.destroy)
router.post('/findbylesson',commantaire.findbyLessons)

module.exports = router