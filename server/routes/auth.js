const express = require('express');
const router = express.Router();
const SignupController = require('../controllers/SignUpController');
const SignInController = require('../controllers/SignInController');
const requireLogin = require('../middleware/requireLogin')

router.get('/',(req,res) =>{
    res.send("helllo")
});


router.post('/signup',SignupController.signup);
router.post('/signin',SignInController.signin);
module.exports = router