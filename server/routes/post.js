const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController')
const requireLogin = require('../middleware/requireLogin');
router.post('/createpost',requireLogin,PostController.createpost)
router.get('/allpost',PostController.getallposts);
router.get('/mypost',requireLogin,PostController.getmypost);

module.exports = router