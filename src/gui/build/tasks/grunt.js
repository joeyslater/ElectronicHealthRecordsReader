module.exports = function(grunt) {
  /**
   * In order to make it safe to just compile or copy *only* what was changed, we need to ensure we are starting from a clean, fresh build. So we rename the
   * `watch` task to `delta` (that's why the configuration var above is `delta`) and then add a new task called `watch` that does a clean build before
   * watching for changes.
   */
  grunt.renameTask('watch', 'delta');
  grunt.registerTask('help', ['availabletasks']);
  grunt.registerTask('watch', ['delta']);

  /**
   * The default task is to compile.
   */
  grunt.registerTask('default', ['compile']);

  /**
   * The `build` task gets your app ready to run for development and testing.
   */
  grunt.registerTask('build', ['clean', 'html2js', 'jshint', 'sass', 'copyContent', 'indexHTML:build']);

  /**
   * The `compile` task gets your app ready for deployment by concatenating and minifying your code.
   */
  grunt.registerTask('compile', ['build', 'ngmin', 'concat:compileJS', 'concat:buildCSS', 'uglify', 'cssmin', 'rev', 'copy:appAssetsCompile', 'indexHTML:compile']);

  /**
   * The `serve` task boots up a local node server & configures it's proxies, runs the watch task, and opens your browser to the index.html page,
   */
  grunt.registerTask('serve', ['build', 'connect:livereload', 'testContinuous', 'watch']);

  /**
   * The `ci` task is for running your continous build on Jenkins.
   */
  grunt.registerTask('ci', ['build', 'testOnce']);

  /**
   * This is not called directly but composes all the copy tasks for css & js.
   */
  grunt.registerTask('copyContent', ['copy:appAssets', 'copy:appJS', 'copy:vendorAssets', 'copy:vendorJS', 'copy:vendorCSS']);

  /**
   * This sets up the Karma server to run in the background.  karma:unit:run task in the watch/delta config file actually
   * runs the tests.
   */
  grunt.registerTask('testContinuous', ['karmaConfig', 'karma:unit']);

  /**
   * This sets up the Karma server and tests to run once.
   */
  grunt.registerTask('testOnce', ['karmaConfig', 'karma:ci']);

  // Load custom build tasks
  grunt.loadTasks('build/tasks/custom');
}
