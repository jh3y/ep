const webpack = require('webpack');
const path    = require('path');

const config = {
  entry: {
    test: './test/test.build.js'
  },
  output: {
    path: `${__dirname}/test`,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: /(src\/script)/,
        query: {
          presets: [
            'es2015'
          ]
        }
      },
      {
        test: /\.scss$/,
        include: /(src\/)/,
        loader: 'null-loader'
      }
    ]
  },
  resolve: {
    root: [
      path.resolve('./src/script')
    ]
    extensions: [ '', '.js' ]
  },
  plugins: [],
}

module.exports = config;
