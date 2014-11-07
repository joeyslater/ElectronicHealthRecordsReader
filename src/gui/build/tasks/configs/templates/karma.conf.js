  /**
   * The Karma configurations.
   */
  module.exports = function(config)
  {
      config.set(
      {
          basePath: '../',
          frameworks: ['jasmine'],
          /**
           * This is the list of file patterns to load into the browser during testing.
           */
          files: [ <% jsFiles.forEach(function(file)
              { %> '<%= file %>', <%
              }); %>
              'src/**/*.js'
          ],
          exclude: [
              'src/assets/**/*.js'
          ],
          // test results reporter to use
          // possible values: 'dots', 'progress', 'junit'
          reporters: ['progress'],

          // web server port
          port: 9876,

          // cli runner port
          runnerPort: 9100,

          // enable / disable colors in the output (reporters and logs)
          colors: true,

          // level of logging
          // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
          logLevel: config.LOG_DEBUG,

          // enable / disable watching file and executing tests whenever any file changes
          autoWatch: false,

          // Start these browsers, currently available:
          // each of these will need added to your path
          // Chrome: CHROME_BIN, IE: IE_BIN, etc
          // - Chrome
          // - ChromeCanary
          // - Firefox
          // - Opera
          // - Safari (only Mac)
          // - PhantomJS
          // - IE (only Windows)
          browsers: ['PhantomJS'],

          // If browser does not capture in given timeout [ms], kill it
          captureTimeout: 60000,

          // report slow unit tests (half second is our cutoff?)
          reportSlowerThan: 500,

          // Continuous Integration mode
          // if true, it capture browsers, run tests and exit
          singleRun: false,

          // plugins above and beyond
          plugins: [
              'karma-*'
          ],

          // junit report config
          junitReporter:
          {
              outputFile: '<%=buildConfig.buildDir%>/junit/test-results.xml'
          },
          preprocessors:
          {
              'src/**/*.js': 'coverage'
          },
          coverageReporter:
          {
              type: 'cobertura',
              dir: '<%=buildConfig.buildDir%>/coverage'
          }
      });
  };
