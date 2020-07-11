const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController')
const requireLogin = require('../middleware/requireLogin');
const User = mongoose.model('User')
const UserController = require('../controllers/UserController');
router.get('/user/:id',UserController.getUser)


module.exports = router