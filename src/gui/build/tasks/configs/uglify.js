  /**
   * Minify the sources!
   */
  module.exports = {
      compile:
      {
          options:
          {
              sourceMap: true,
              sourceMapName: '<%= buildConfig.compileDir %>/main.map'
          },
          files:
          {
              '<%= concat.compileJS.dest %>': '<%= concat.compileJS.dest %>'
          }
      }
  };
