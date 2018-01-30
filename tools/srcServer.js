// This file configures the development web server
// which supports hot reloading and synchronized testing.
// Require Browsersync along with webpack and middleware for it
// Required for react-router browserHistory
// see https://github.com/BrowserSync/browser-sync/issues/204#issuecomment-102623643
import webpack from "webpack";
import config from "../webpack/webpack.config.dev";
import WebpackDevServer from "webpack-dev-server";

const bundler = webpack(config);

new WebpackDevServer(bundler, {
  publicPath: config.output.publicPath,
  contentBase: './static',
  hot: true,
  inline: true,
  https: true,
  proxy: {
    '/api': {
      target: "http://localhost:9000",
      pathRewrite: {'^/api': ''},
      secure: false
    },
    '/uaa': {
      target: "http://localhost:9999"
    }
  },
  compress: true,
  historyApiFallback: true,
}).listen(3000, 'localhost', (err, res) => {
  if (err) {
    return console.log(err);
  }
  console.log('server is up on port 3000');
});
