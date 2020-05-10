/* eslint-disable no-underscore-dangle */
require('dotenv').config();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

// create a collection of test documents
const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' });
  await blog.save();
  await blog.remove();
  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const userToken = async () => {
  // generate an access token
  const userAfterSave = await User.findOne({ username: 'testuser' });

  const userForToken = {
    username: userAfterSave.username,
    id: userAfterSave._id,
  };

  const signToken = jwt.sign(userForToken, process.env.SECRET);
  return signToken;
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  userToken,
};
