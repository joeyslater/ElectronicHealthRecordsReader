  /**
   * The Karma configurations.
   */
  module.exports = {
      options:
      {
          runnerPort: 9111,
          configFile: '<%= buildConfig.buildDir %>' + '/karma.conf.js'
      },
      unit:
      {
          singleRun: false,
          background: true,
          reporters: ['dots'],
          browsers: ['PhantomJS']
      },
      ci:
      {
          singleRun: true,
          background: false,
          reporters: ['junit', 'coverage'],
          browsers: ['PhantomJS']
      }
  };
