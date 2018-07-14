// For info about this file refer to webpack and webpack-hot-middleware documentation
// For info on how we're generating bundles with hashed filenames for cache busting: https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95#.w99i89nsz
import webpack from "webpack";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import WebpackMd5Hash from "webpack-md5-hash";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CompressionPlugin from "compression-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import ScriptExtHtmlWebpackPlugin from "script-ext-html-webpack-plugin";
import CleanWebpackPlugin from 'clean-webpack-plugin';
import path from "path";

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
  'process.env.PORT': JSON.stringify('3000'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
  'process.env.API_URL': JSON.stringify("/api"),
  'process.env.LOGIN_URL': JSON.stringify("https://washing-time.herokuapp.com/app/login"),
  'process.env.LOGIN_URL_VK': JSON.stringify("https://washing-time.herokuapp.com/app/login/vk"),
  'process.env.VK_API_VERSION': JSON.stringify("5.78"),
  'process.env.AUTH_SERVER_URL': JSON.stringify("https://backend-for-react-authserver.herokuapp.com"),
  __SERVER__: false,
  __DEV__: false
};

export default {
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  devtool: 'source-map', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
  entry: path.resolve(__dirname, '../src/client'),
  target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  mode: 'production',

  output: {
    path: path.resolve(__dirname, '../../resources/static/app'),
    publicPath: '/app/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    // Hash the files using MD5 so that their names change when the content changes.
    new CleanWebpackPlugin(['../../resources/static/app'], {allowExternal: true}),
    new WebpackMd5Hash(),
    new webpack.LoaderOptionsPlugin({
      debug: false
    }),

    // Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
    new webpack.DefinePlugin(GLOBALS),

    // Generate an external css file with a hash in the filename
    new ExtractTextPlugin('[name].[md5:contenthash:hex:20].css'),

    // Generate HTML file that contains references to generated bundles. See here for how this works: https://github.com/ampedandwired/html-webpack-plugin#basic-usage
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
    }),

    // Optimize the order that items are bundled. This assures the hash is deterministic.
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
    new CopyWebpackPlugin([
      {from: './static/app', to: './'},
      {from: './static/firebase-messaging-sw.js', to: '../'},
    ]),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
    }),
  ],
  module: {
    rules: [
      {test: /\.jsx?$/, exclude: /node_modules/, use: ['babel-loader']},
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/, use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff',
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/octet-stream',
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.svg(\?v=\d+.\d+.\d+)?$/, use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'image/svg+xml',
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i, use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /(\.css|\.scss|\.sass)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                sourceMap: true
              }
            }, {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('autoprefixer')
                ],
                sourceMap: true
              }
            }, {
              loader: 'sass-loader',
              options: {
                includePaths: [path.resolve(__dirname, 'src', 'scss')],
                sourceMap: true
              }
            }
          ]
        })
      },
      // {test: /\.json$/, loader: "json"}
    ]
  }
};
