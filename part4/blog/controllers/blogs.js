
require('dotenv').config();
const jwt = require('jsonwebtoken');

const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const blog = request.body;

  const decodedToken = jwt.verify(blog.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid or missing' });
  }

  const user = await User.findById(decodedToken.id);

  if (!blog.likes) {
    blog.likes = 0;
  }

  const newBlog = new Blog({
    ...blog,
    // eslint-disable-next-line no-underscore-dangle
    user: user._id,
  });

  const savedBlog = await newBlog.save();

  // eslint-disable-next-line no-underscore-dangle
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  return response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const { body } = request;

  const decodedToken = jwt.verify(body.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid or missing' });
  }

  const user = await User.findById(decodedToken.id);

  const blog = await Blog.findById(request.params.id);

  // eslint-disable-next-line no-underscore-dangle
  if (user._id.toString() !== blog.user.toString()) {
    return response.status(401)
      .json({ error: 'user not authorized to delete the blog' });
  }

  await Blog.findByIdAndRemove(request.params.id);
  return response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const { body } = request;

  // Note: findByIdAndUpdate() options.new=true
  // returns the updated document not the old one
  const decodedToken = jwt.verify(body.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid or missing' });
  }

  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, body, { new: true })
    .populate('user', { username: 1, name: 1, id: 1 });
  return response.status(200).json(updatedBlog.toJSON());
});

module.exports = blogsRouter;
