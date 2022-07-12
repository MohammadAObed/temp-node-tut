const express = require('express')
const router = express.Router()

const {login,dashboard} = require('../controllers/main')

const authMiddleware = require('../middleware/auth')

router.route('/dashboard').get(authMiddleware, dashboard) //get the data and the token
router.route('/login').post(login) //send the data, username & password

module.exports = router