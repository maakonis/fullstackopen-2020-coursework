import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: blogs
    })
  }
}

export const addBlog = (newObj) => {
  return async dispatch => {
    const newBlog = await blogService.create(newObj)
    dispatch({
      type: 'ADD',
      data: newBlog
    })
  }
}

export const upvoteBlog = (newObj) => {
  return async dispatch => {
    const putBlog = {
      ...newObj,
      user: newObj.user.id,
      comments: newObj.comments.map((comment) => comment.id),
      likes: newObj.likes + 1 }
    console.log('putBlog', putBlog)
    const response = await blogService
      .update(putBlog)
    console.log('response', response);
    console.log('upvotedBlog', response)
    dispatch({
      type: 'UPVOTE',
      data: response
    })
  }
}

export const deleteBlog = (obj) => {
  return async dispatch => {
    await blogService.remove(obj)
    dispatch({
      type: 'DELETE',
      data: obj
    })
  }
}

export const addComment = (obj, blog) => {
  return async dispatch => {
    const { id } = blog
    console.log('id', id)
    console.log('obj', obj)
    const response = await blogService
      .createComment(obj, id)
    console.log('response', response)
    dispatch({
      type: 'ADD_COMMENT',
      data: response,
      id,
    })
  }
}

export const resetBlog = () => {
  return dispatch => {
    dispatch({
      type: 'RESET',
    })
  }
}

const initialState = []
const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'ADD':
    return state.concat(action.data)
  case 'INITIALIZE':
    return action.data
  case 'UPVOTE': {
    const newBlogId = action.data.id
    return state
      .map(obj => obj.id !== newBlogId ? obj : action.data)
  }
  case 'DELETE': {
    const deleteBlogId = action.data.id
    return state
      .filter(obj => obj.id !== deleteBlogId)
  }
  case 'ADD_COMMENT': {
    console.log('state', state)
    return state.map(obj => {
      if (obj.id === action.id) {
        obj.comments = obj.comments.concat(action.data)
      }
      return obj
    })
  }
  case 'RESET':
    return initialState
  default:
    return state
  }
}

export default reducer