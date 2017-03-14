import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import reduxLogger from 'redux-logger'
import reduxPromise from 'redux-promise'
import reduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'
import App from './components/App'

import reducer from "./reducers"

let middlewares = [
  reduxThunk,
  reduxPromise,
  reduxLogger()
]

let store = createStore(reducer, applyMiddleware(...middlewares))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
