
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
  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const { body } = request;
  // Note: findByIdAndUpdate() options.new=true
  // returns the updated document not the old one
  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, body, { new: true });
  response.status(200).json(updatedBlog.toJSON());
});

module.exports = blogsRouter;
