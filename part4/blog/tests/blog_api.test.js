const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

// before each test (beforeEach) amend the database
beforeEach(async () => {
  // populate with a new user
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash('potato', 10);
  const user = new User({ username: 'testuser', passwordHash });
  await user.save();
  // eslint-disable-next-line no-underscore-dangle
  const userId = user._id;

  // populate with blogs
  await Blog.deleteMany({});
  const blogObject = helper.initialBlogs
    .map((blog) => {
      const authoredBlog = blog;
      authoredBlog.user = userId;
      return authoredBlog;
    })
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

  // eslint-disable-next-line no-underscore-dangle
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

  const token = await helper.userToken();

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAfterPost = await helper.blogsInDb();

  const titles = blogsAfterPost.map((blog) => blog.title);

  expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length + 1);
  expect(titles).toContain('Redux your life');
});

test('error adding blog with no token', async () => {
  const newBlog = {
    title: 'Redux your life',
    author: 'Michael Chan',
    url: 'https://reduxlife.com/',
    likes: 14,
  };

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401);

  expect(response.body.error).toContain('invalid token');
});

test('blog without likes defaults to 0', async () => {
  const newBlog = {
    title: 'Mysteries of integration testing',
    author: 'Michael Chan',
    url: 'https://reduxlife.com/',
  };

  const token = await helper.userToken();

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
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

  const token = await helper.userToken();

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400);
});

test('delete a blog entry', async () => {
  const blogsBeforeDelete = await helper.blogsInDb();
  const removedBlogId = blogsBeforeDelete[0].id;
  const token = await helper.userToken();

  await api
    .del(`/api/blogs/${removedBlogId}`)
    .set('Authorization', `Bearer ${token}`)
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

test('creation succeeds with fresh username', async () => {
  const usersAtStart = await helper.usersInDb();

  const newUser = {
    name: 'John Tomato',
    username: 'jonato',
    password: 'ketchup',
  };

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

  const usernames = usersAtEnd.map((user) => user.username);
  expect(usernames).toContain(newUser.username);
});

test('error when username too short', async () => {
  const invalidUser = {
    name: 'John Tomato',
    username: 'jo',
    password: 'ketchup',
  };

  await api
    .post('/api/users')
    .send(invalidUser)
    .expect(400);
});

test('error when no username', async () => {
  const invalidUser = {
    name: 'John Tomato',
    password: 'ketchup',
  };

  await api
    .post('/api/users')
    .send(invalidUser)
    .expect(400);
});

test('error when adding same username', async () => {
  const newUser = {
    name: 'John Tomato',
    username: 'jonato',
    password: 'ketchup',
  };

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200);

  const response = await api
    .post('/api/users')
    .send(newUser)
    .expect(400);

  expect(response.body.error).toContain('Error, expected `username` to be unique.');
});

test('error when password too short', async () => {
  const invalidUser = {
    name: 'John Tomato',
    username: 'jonato',
    password: 'ke',
  };

  const response = await api
    .post('/api/users')
    .send(invalidUser)
    .expect(400);

  expect(response.body.error)
    .toContain('Password should be at least 3 characters long.');
});

test('error when no password', async () => {
  const invalidUser = {
    name: 'John Tomato',
    username: 'jonato',
  };

  const response = await api
    .post('/api/users')
    .send(invalidUser)
    .expect(400);

  expect(response.body.error)
    .toContain('Password missing');
});

afterAll(() => {
  mongoose.connection.close();
});
