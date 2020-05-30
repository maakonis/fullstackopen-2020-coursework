import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import notifyReducer from './notifyReducer'
import loginReducer from './loginReducer'
import blogReducer from './blogReducer'

const reducer = combineReducers(
  {
    user: loginReducer,
    notification: notifyReducer,
    blogs: blogReducer,
  },
)

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
)

export default store
