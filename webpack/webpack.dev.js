const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');

const config = merge(common, {
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    publicPath: '/',
    compress: false,
    port: 8080,
  },
});

module.exports = config;
