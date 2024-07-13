const Post = require('../models/posts');
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createPost = async (req, res) => {
    const { author, title, content } = req.body;
    let imageUrl = null;

    if (req.file) {
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: `${uuidv4()}-${req.file.originalname}`,
            ACL: 'public-read',
            Body: req.file.buffer,
        };

        try {
            const data = await s3.upload(params).promise();
            imageUrl = data.Location;
        } catch (err) {
            console.error('S3 Upload Error:', err);
            return res.status(500).json({ error: err.message });
        }
    }

    try {
        const post = await Post.create({ author, title, content, imageUrl });
        res.status(201).json(post);
    } catch (err) {
        console.error('Post Creation Error:', err);
        res.status(500).json({ error: err.message });
    }
};
