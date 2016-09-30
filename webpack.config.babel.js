const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer      = require('autoprefixer');
const webpack           = require('webpack');
const path              = require('path');

const IS_DIST = (process.argv.indexOf('--dist') !== -1) ? true : false;
const IS_DEPLOY = (process.argv.indexOf('--deploy') !== -1) ? true : false;
const STYLE_LOAD = 'css-loader!postcss-loader!sass-loader';
const STYLE_LOADER = (IS_DIST || IS_DEPLOY) ? ExtractTextPlugin.extract('style-loader', STYLE_LOAD) : `style-loader!${STYLE_LOAD}`;

const config = {
  devServer: {
    port: 1987
  },
  entry: {
    demo: './src/script/entries/demo'
  },
  output: {
    path: `${__dirname}/public`,
    filename: '[name][hash].js'
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
        loader: STYLE_LOADER
      },
      {
        test: /\.pug$/,
        include: /(src\/markup)/,
        loader: 'pug'
      }
    ]
  },
  resolve: {
    root: [
      path.resolve('./src/script'),
      path.resolve('./src/style')
    ],
    extensions: [ '', '.js', '.styl' ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/markup/index.pug',
      filename: 'index.html',
      chunks: [ 'demo' ],
      minify: {
        collapseWhitespace: true
      }
    }),
    (IS_DEPLOY) ? function () {} : new HtmlWebpackPlugin({
      template: './src/markup/sandbox.pug',
      filename: 'sandbox.html',
      chunks: [ 'demo' ],
      minify: {
        collapseWhitespace: true
      }
    }),
    (IS_DEPLOY) ? new ExtractTextPlugin('[name][hash].css') : function () {},
    (IS_DEPLOY) ? new webpack.optimize.UglifyJsPlugin() : function () {}
  ],
  postcss: function () {
    return [ autoprefixer ];
  }
}

module.exports = config;
