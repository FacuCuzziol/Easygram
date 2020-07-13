const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController')
const requireLogin = require('../middleware/requireLogin');

const UserController = require('../controllers/UserController');
router.get('/user/:id',requireLogin,UserController.getUser)
router.put('/follow',requireLogin,UserController.follow)
router.put('/unfollow',requireLogin,UserController.unfollow)
router.put('/updatepic',requireLogin,UserController.updatepic)

module.exports = router