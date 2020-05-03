const http = require('http');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const cors = require('cors');
const config = require('./utils/config');
const logger = require('./utils/logger');
const Blog = require('./models/blog');


const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then((blogs) => {
      response.json(blogs);
    });
});

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    });
});

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
