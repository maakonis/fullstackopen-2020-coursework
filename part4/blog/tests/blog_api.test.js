const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');
const logger = require('../utils/logger');

// before each test (beforeEach) amend the database
beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObject = helper.initialBlogs
    .map((blog) => new Blog(blog));
  const blogPromises = blogObject
    .map((blog) => blog.save());

  await Promise.all(blogPromises);
});

// express application is wrapped in a superagent object that
// allows to test HTTP requests
const api = supertest(app);

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('correct number of blogs is returned', async () => {
  const response = await helper.blogsInDb();
  expect(response)
    .toHaveLength(helper.initialBlogs.length);
});

test('blog document ids is defined', async () => {
  const response = await helper.blogsInDb();
  const idees = response.map((blog) => blog.id);
  idees.map((id) => expect(id).toBeDefined());
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Redux your life',
    author: 'Michael Chan',
    url: 'https://reduxlife.com/',
    likes: 14,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAfterPost = await helper.blogsInDb();

  const titles = blogsAfterPost.map((blog) => blog.title);

  expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length + 1);
  expect(titles).toContain('Redux your life');
});

test('blog without likes defaults to 0', async () => {
  const newBlog = {
    title: 'Mysteries of integration testing',
    author: 'Michael Chan',
    url: 'https://reduxlife.com/',
  };

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogLikes = response.body.likes;
  expect(blogLikes).toBe(0);
});

test('bad request 400 if title and url missing', async () => {
  const newBlog = {
    author: 'Michael Chan',
    likes: 43,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
