const Blog = require('../model/Blog');
const router = require('express').Router();

//create a blog
router.post('/create', async (req, res) => {
    const newBlog = new Blog(req.body);
    try {
        const savedBlog = await newBlog.save();
        res.status(200).json(savedBlog);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get all blogs
router.get('/', async (req, res) => {
    try {
        const blog = await Blog.find();
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
