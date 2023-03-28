const express = require('express')
const propertyController = require('../controllers/property')

const router = express.Router()

router.post('/add', propertyController.add)
router.get('/all', propertyController.allProperties)

module.exports = router