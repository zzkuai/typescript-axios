const { resolve } = require('./common')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  mode: 'development',

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    noInfo: true,
    open: true,
    contentBase: resolve('dist'),
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
    },
  },
})
