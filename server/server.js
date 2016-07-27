import path from 'path'
import Express from 'express'
import qs from 'qs'
import http from 'http'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'

import configureStore from '../common/store/configureStore'
import App from '../common/containers/App'
import { fetchCounter } from '../common/api/counter'
import { createServer } from './api/index'

import { createSocket } from './socket'

const app = new Express()
const port = 8989

// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

// api
createServer(app);

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

// const params = qs.parse(req.query)

const server = http.Server(app);

createSocket(server,port);

server.listen(port,(error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
});
