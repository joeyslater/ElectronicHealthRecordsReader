 /**
  * `grunt concat` concatenates multiple source files into a single file.
  */
 module.exports = {
   /**
    * The `buildCSS` target concatenates compiled CSS and vendor CSS together.
    */
   buildCSS: {
     src: ['<%= buildConfig.vendorFiles.css %>', '<%= buildConfig.compileDir %>/assets/main.css'],
     dest: '<%= buildConfig.compileDir %>/main.css'
   },
   /**
    * The `compileJS` target is the concatenation of our application source code and all specified vendor source code into a single file.
    */
   compileJS: {
     src: ['<%= buildConfig.vendorFiles.js %>', './build/module.prefix', '<%= buildConfig.buildDir%>/src/**/*.js', '<%= html2js.app.dest %>', '<%= html2js.common.dest %>',
       './build/module.suffix'
     ],
     dest: '<%= buildConfig.compileDir %>/main.js'
   }

 };
