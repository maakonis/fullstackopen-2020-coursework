import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const newUser = await loginService.login({ username, password })
      setUser(newUser);
      window.localStorage.setItem('loggedUser', JSON.stringify(newUser));
      // blogService.setToken(user.token);
      setPassword('');
      setUsername('');
    } catch (error) {
      console.log('login error', error);
      setIsError(true);
      setNotification('wrong username or password');
      await setTimeout(() => setNotification(null), 3000);
    }
  }

  const handleLogout = () => {
    setUser(null);
    window.localStorage.clear()
  };

  const handleNewBlog = (event) => {
    const { target } = event;
    const name = target.name;
    const value = target.value;
    setNewBlog({ ...newBlog, [name]: value });
  }

  const submitBlog = async (event) => {
    event.preventDefault();
    try {
      blogService.setToken(user.token);
      await blogService.create(newBlog);
    } catch (error) {
      setIsError(true);
      setNotification('could not add the blog...');
      await setTimeout(() => setNotification(null), 3000);
      return console.log('error', error)
    }

    setIsError(false);
    setNotification(`Blog ${newBlog.title} by ${newBlog.author} has been added.`);
    setNewBlog({ title: '', author: '', url: '' })
    const blogsFromDB = await blogService.getAll();
    setBlogs(blogsFromDB);
    await setTimeout(() => setNotification(null), 3000);
  }

  const loginForm = () => {
    return (
      <>
      <h2>Login</h2>
      <Notification message={notification} isError={isError} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            name="Username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            name="Password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      </>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>Log into application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notification} isError={isError} />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>Logout</button>
      </p>
      <form onSubmit={submitBlog}>
        <p>title: 
          <input 
          type="text" 
          name="title" 
          value={newBlog.title} 
          onChange={handleNewBlog} 
          />
        </p>
        <p>author: 
          <input 
            type="text" 
            name="author" 
            value={newBlog.author} 
            onChange={handleNewBlog} 
            />
        </p>
        <p>url: 
          <input 
            type="text"
            name="url" 
            value={newBlog.url} 
            onChange={handleNewBlog} 
            />
          <button type="submit">Upload</button>
        </p>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App