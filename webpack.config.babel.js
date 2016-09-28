const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer      = require('autoprefixer');
const webpack           = require('webpack');
const path              = require('path');

const IS_DIST = (process.argv.indexOf('--dist') !== -1) ? true : false;
const STYLE_LOAD = 'css-loader!postcss-loader!sass-loader';
const STYLE_LOADER = (IS_DIST) ? ExtractTextPlugin.extract('style-loader', STYLE_LOAD) : `style-loader!${STYLE_LOAD}`;

const config = {
  devServer: {
    port: 1987
  },
  entry: (IS_DIST) ? {
    vade: './src/script/entries/vade',
    'vade.min': './src/script/entries/vade'
  } : {
    demo: './src/script/entries/demo',
    vade: './src/script/entries/vade'
  },
  output: {
    path: `${__dirname}/${(IS_DIST) ? 'dist' : 'public'}`,
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
        loader: STYLE_LOADER
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
    (IS_DIST) ? function () {} : new HtmlWebpackPlugin({
      template: './src/markup/index.html',
      filename: 'index.html',
      chunks: ['vade', 'demo'],
      minify: {
        collapseWhitespace: true
      }
    }),
    (IS_DIST) ? new ExtractTextPlugin('[name].css') : function () {},
    /* If --dist is present in process opts then minimize bundles */
    // (IS_DIST) ? new webpack.optimize.UglifyJsPlugin({
      // include: /\.min\.js$/
    // }) : function () {}
  ],
  postcss: function () {
    return [ autoprefixer ];
  }
}

module.exports = config;
