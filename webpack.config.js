var path = require('path')
var webpack = require('webpack')
var BowerWebpackPlugin = require("bower-webpack-plugin");

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/index.js'
  ],
  output: {
    path: path.join(__dirname, ''),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ResolverPlugin(
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
      )
  ],
  resolve: {
    root: [
      path.join(__dirname, "bower_components")
    ]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: __dirname,
        query: {
          presets: [ 'react-hmre' ]
        }
      },
      {
        test: /\.css$/,
        loader: "style!raw",
        include: __dirname
      },
      {test: /\.less$/, loader: "style!css!less|postcss"},
      {test: /\.scss$/, loader: "style!css!sass|postcss"},
      
    ]
  }
}
