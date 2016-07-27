import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory, Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from '../common/store/configureStore'
import App from '../common/containers/App'
import routes from '../common/routes/index'
import '../common/css/main.css'
import 'antd/dist/antd.css';

const preloadedState = {};
const store = configureStore(preloadedState)
const rootElement = document.getElementById('root')

const history = syncHistoryWithStore(browserHistory, store)

// 注意 subscribe() 返回一个函数用来注销监听器
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  rootElement
)
