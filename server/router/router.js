const express = require('express');
const router = express.Router();

const UsersController = require('../controller/UsersController.js')
router.post('/login',UsersController.login)

router.post('/signup',UsersController.signup)



module.exports=router

