const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const work = require('../controllers/work')
router.get('/',work.index)
router.post('/show',work.show)
router.post('/add',work.add)
router.post('/update',work.update)
router.post('/delete',work.destroy)
module.exports = router