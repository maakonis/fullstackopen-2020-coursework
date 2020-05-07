
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const blog = request.body;

  if (!blog.likes) {
    blog.likes = 0;
  }

  const newBlog = new Blog(request.body);
  const savedBlog = await newBlog.save();
  response.status(201).json(savedBlog.toJSON());
});

module.exports = blogsRouter;
