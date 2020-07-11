const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController')
const requireLogin = require('../middleware/requireLogin');
router.post('/createpost',requireLogin,PostController.createpost)
router.get('/allpost',requireLogin,PostController.getallposts);
router.get('/mypost',requireLogin,PostController.getmypost);
router.put('/like',requireLogin,PostController.likePost)
router.put('/unlike',requireLogin,PostController.unlikePost)
router.put('/comment',requireLogin,PostController.comment)
router.delete('/deletepost/:postId',requireLogin,PostController.deletePost)
module.exports = router