var filter = require(require("path").resolve('build/utils/filter'));

module.exports = function(grunt) {
  /**
   * The index.html template includes the stylesheet and javascript sources based on dynamic names calculated in this Gruntfile. This task assembles the list
   * into variables for the template to use and then runs the compilation.
   */
  grunt.registerMultiTask('indexHTML', 'Process index.html template', function() {
    var buildConfig = grunt.config('buildConfig');
    var replaceDirExp = this.data.dir.replace(/\//g, '\\/');

    var dirRE = new RegExp('^(' + replaceDirExp + ')\/', 'g');

    var jsFiles = filter.forJS(this.filesSrc).map(function(file) {
      return file.replace(dirRE, '');
    });
    var cssFiles = filter.forCSS(this.filesSrc).map(function(file) {
      return file.replace(dirRE, '');
    });

    var testFiles = filter.forCSS(buildConfig.appFiles.jsunit).map(function(file) {
      return file.replace(dirRE, '');
    });

    grunt.file.copy('src/index.html', buildConfig[this.target + 'Dir'] + '/index.html', {
      process: function(contents, path) {
        return grunt.template.process(contents, {
          data: {
            jsFiles: jsFiles,
            cssFiles: cssFiles,
            buildConfig: buildConfig,
            version: grunt.config('pkg.version')
          }
        });
      }
    });
  });
}
