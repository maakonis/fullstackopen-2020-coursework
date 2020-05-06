const listHelper = require('../utils/list_helper');

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

const equalLikeCountBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

describe('dummy', () => {
  test('returns one', () => {
    const result = listHelper.dummy([]);
    expect(result).toBe(1);
  });
});

describe('totalLikes', () => {
  test('of an empty list is 0', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test('of one blog equals to its likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
      }];
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('of several blog is the sum of likes', () => {
    const multipleBlogs = [...blogs];
    const result = listHelper.totalLikes(multipleBlogs);
    expect(result).toBe(36);
  });
});

describe('favoriteBlog', () => {
  test('of multiple blogs with different like counts', () => {
    const favoriteBlog = blogs.map((blog) => {
      const { author, title, likes } = blog;
      return {
        author,
        title,
        likes,
      };
    })[2];
    const result = listHelper.favoriteBlogs(blogs);
    expect(result).toEqual(favoriteBlog);
  });

  test('of multiple blogs with same like counts', () => {
    const favoriteBlog = equalLikeCountBlogs.map((blog) => {
      const { author, title, likes } = blog;
      return {
        author,
        title,
        likes,
      };
    })[1];
    const result = listHelper.favoriteBlogs(equalLikeCountBlogs);
    expect(result).toEqual(favoriteBlog);
  });

  test('of no blogs', () => {
    const result = listHelper.favoriteBlogs([]);
    expect(result).toBe(0);
  });
});

describe('mostBlogs', () => {
  test('of multiple blogs', () => {
    const topAuthor = { author: 'Robert C. Martin', blogs: 3 };

    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual(topAuthor);
  });

  test('no blogs', () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toBe(0);
  });
});

describe('mostLikes', () => {
  test('of multiple blogs', () => {
    const topAuthor = { author: 'Edsger W. Dijkstra', likes: 17 };

    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual(topAuthor);
  });

  test('no blogs', () => {
    const result = listHelper.mostLikes([]);
    expect(result).toBe(0);
  });
});
