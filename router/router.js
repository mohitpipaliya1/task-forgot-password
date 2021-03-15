const express = require('express')
const auth = require('../auth')
const router = new express.Router()

const {signupuser,signinuser,forgotpasslink,logout,forgotpassword,reset} = require('../controller/controller')


router.post("/signup", signupuser)

router.post('/signin',signinuser)

router.post('/forgot',forgotpasslink)

router.post('/logout',auth,logout)

router.post('/forgotpassword/:id',forgotpassword)

router.post('/reset',reset)

module.exports = router;