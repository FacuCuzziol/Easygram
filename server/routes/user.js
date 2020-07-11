const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController')
const requireLogin = require('../middleware/requireLogin');

const UserController = require('../controllers/UserController');
router.get('/user/:id',requireLogin,UserController.getUser)


module.exports = router