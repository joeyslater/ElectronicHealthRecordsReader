 /**
  * For rapid development, we have a watch set up that checks to see if any of the files listed below change, and then to execute the listed tasks
  * when they do. This just saves us from having to type "grunt" into the command-line every time we want to see what we're working on; we can instead
  * just leave "grunt watch" running in a background terminal. Set it and forget it, as Ron Popeil used to tell us. But we don't need the same thing to
  * happen for all the files.
  */

 module.exports = {
     /**
      * By default, we want the Live Reload to work for all tasks; this is overridden in some tasks (like this file) where browser resources are
      * unaffected. It runs by default on port 35729, which your browser plugin should auto-detect.
      *
      * Setting this option to false speeds up the reaction time of the watch as it doesn't completely reload the Gruntfile and reregister it's tasks.
      * There is some inherent risk to having this set to true so be aware.
      */
     options:
     {
         livereload: true,
         spawn: false
     },

     /**
      * When the Gruntfile changes, we just want to lint it. In fact, when your Gruntfile changes, it will automatically be reloaded!
      */
     gruntfile:
     {
         files: 'Gruntfile.js',
         tasks: ['jshint:gruntfile'],
         options:
         {
             livereload: false
         }
     },

     /**
      * When our JavaScript source files change, we want to run lint them and run our unit tests.
      */
     jssrc:
     {
         files: ['<%= buildConfig.appFiles.js %>'],
         tasks: ['newer:jshint:src', 'newer:copy:appJS', 'karma:unit:run']
     },


     /**
      * When index.html changes, we need to compile it.
      */
     html:
     {
         files: ['<%= buildConfig.appFiles.html %>'],
         tasks: ['indexHTML:build']
     },

     /**
      * When our templates change, we only rewrite the template cache.
      */
     tpls:
     {
         files: ['<%= buildConfig.appFiles.atpl %>', '<%= buildConfig.appFiles.ctpl %>'],
         tasks: ['html2js']
     },

     /**
      * When the CSS files change, we need to compile and minify them.
      */
     sass:
     {
         files: ['src/**/*.scss'],
         tasks: 'sass:build'
     },

     /**
      * When a JavaScript unit test file changes, we only want to lint it and run the unit tests. We don't want to do any live reloading.
      */
     karma:
     {
         files: ['<%= buildConfig.appFiles.jsunit %>'],
         tasks: ['newer:jshint:test', 'karma:unit:run'],
         options:
         {
             livereload: false
         }
     }
 };
