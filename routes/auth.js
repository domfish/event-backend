const express = require('express')
const router = express.Router()
const passport = require('passport');
const {register , login,forgotPassword} = require('../controllers/authController')



router.post('/register',register)
router.post('/login',login)

router.post('/forgetpassword',forgotPassword)

module.exports = router;