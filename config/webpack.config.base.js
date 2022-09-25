const wepback = require('webpack');
const { resolve } = require('./common');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: resolve('./src/web/index.ts'),

  output: {
    path: resolve('dist'),
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },

  resolve: {
    alias: {
      '@': resolve('./src'),
    },
    extensions: ['.ts', '.js'],
  },

  plugins: [
    new wepback.DefinePlugin({
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('./src/web/index.html'),
    }),
  ],
};
