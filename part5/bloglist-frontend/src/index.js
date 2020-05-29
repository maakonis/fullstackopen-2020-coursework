import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './reducers/store'
import App from './App'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>, document.getElementById('root'))