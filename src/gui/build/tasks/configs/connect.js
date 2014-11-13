  /**
   * Runs a connect server. The main item to be concerned with is the proxy server configuration
   */
  module.exports = {
      proxies: '<%= buildConfig.proxies %>',
      livereload:
      {
          options:
          {
              livereload: true,
              port: 9000,
              // Change this to '0.0.0.0' to access the server from outside.
              hostname: 'localhost',
              middleware: function(connect, options)
              {
                  var middlewares = [];

                  /**
                   * Code snippet that will intercept requests and proxy them out appropriately based on the config.proxies that
                   * are setup
                   */

                  // Serve static files.
                  middlewares.push(connect.static(require('path').resolve('target')));
                  middlewares.push(connect.static(require('path').resolve('vendor')));

                  return middlewares;
              }
          }
      }
  };
