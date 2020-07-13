const express = require('express');
const router = express.Router();
const SignupController = require('../controllers/SignUpController');
const SignInController = require('../controllers/SignInController');
const requireLogin = require('../middleware/requireLogin')
const PasswordController = require('../controllers/PasswordController');

router.get('/',(req,res) =>{
    res.send("helllo")
});


router.post('/signup',SignupController.signup);
router.post('/signin',SignInController.signin);
router.post('/reset-password',PasswordController.resetPassword)
router.post('/new-password',PasswordController.newPassword)

module.exports = router