const _ = require('lodash');

const dummy = () => 1;

const totalLikes = (blogs) => {
  if (blogs.length === 0) { return 0; }

  const likes = blogs.map((blog) => blog.likes)
    .reduce((sum, likeCount) => sum + likeCount);
  return likes;
};

const favoriteBlogs = (blogs) => {
  if (blogs.length === 0) { return 0; }

  const formattedBlogs = blogs.map((blog) => {
    const { author, title, likes } = blog;
    return {
      author,
      title,
      likes,
    };
  });
  const likesList = formattedBlogs.map((blog) => blog.likes);
  const mostLikes = likesList.indexOf(Math.max(...likesList));
  return formattedBlogs[mostLikes];
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) { return 0; }

  const countAuthors = _.countBy(blogs, (blog) => blog.author);
  const authorBlogCount = Object.keys(countAuthors)
    .map((author) => ({ author, blogs: countAuthors[author] }));
  const topAuthor = _.sortBy(authorBlogCount, (o) => o.blogs)
    .reverse()[0];
  return topAuthor;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) { return 0; }

  const groupedAuthors = _.groupBy(blogs, 'author');
  const authorKeys = Object.keys(groupedAuthors);
  const authorLikeCount = authorKeys.map((author) => {
    const likes = _.sum(groupedAuthors[author]
      .map((blog) => blog.likes));
    return { author, likes };
  });
  const topAuthor = _.sortBy(authorLikeCount, (o) => o.likes)
    .reverse()[0];
  return topAuthor;
};


module.exports = {
  dummy,
  totalLikes,
  favoriteBlogs,
  mostBlogs,
  mostLikes,
};
