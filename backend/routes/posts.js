const express = require('express');
const multer = require('multer');
const postController = require('../controllers/posts');

const router = express.Router();
const upload = multer();

router.get('/', postController.getPosts);
router.post('/', upload.single('image'), postController.createPost);

module.exports = router;
