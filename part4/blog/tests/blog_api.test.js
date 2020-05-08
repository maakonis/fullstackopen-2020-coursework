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

  const oldIdees = response.map((blog) => blog._id);
  const idees = response.map((blog) => blog.id);

  oldIdees.map((id) => expect(id).not.toBeDefined());
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

test('delete a blog entry', async () => {
  const blogsBeforeDelete = await helper.blogsInDb();
  const removedBlogId = blogsBeforeDelete[0].id;
  await api
    .del(`/api/blogs/${removedBlogId}`)
    .expect(204);

  const blogsAfterDelete = await helper.blogsInDb();
  const remainingIds = blogsAfterDelete.map((blog) => blog.id);
  expect(remainingIds).not.toContain(removedBlogId);
});

test('update a blog entry', async () => {
  const blogsBeforeUpdate = await helper.blogsInDb();
  const blogId = blogsBeforeUpdate[0].id;
  const blogUpdate = { likes: 1423 };

  await api
    .put(`/api/blogs/${blogId}`)
    .send(blogUpdate)
    .expect(200);

  const blogsAfterUpdate = await helper.blogsInDb();
  const updatedBlog = blogsAfterUpdate.find((blog) => blog.id === blogId);
  expect(updatedBlog.likes).toBe(blogUpdate.likes);
});

afterAll(() => {
  mongoose.connection.close();
});
