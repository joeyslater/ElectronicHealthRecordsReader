 /**
  * The `index` task compiles the `index.html` file as a Grunt template. CSS and JS files co-exist here but they get split apart later.
  */
 module.exports = {
     /**
      * During development, we don't want to have wait for compilation, concatenation, minification, etc. So to avoid these steps, we simply add all
      * script files directly to the `<head>` of `index.html`. The `src` property contains the list of included files.
      */
     build:
     {
         dir: '<%= buildConfig.buildDir%>',
         src: ['<%= buildConfig.vendorFiles.js %>', '<%= buildConfig.buildDir%>/src/**/*.js', '<%= html2js.common.dest %>', '<%= html2js.app.dest %>',
             '<%= buildConfig.vendorFiles.css %>', '<%= buildConfig.buildDir%>/assets/**/*.css'
         ]
     },

     /**
      * When it is time to have a completely compiled application, we can alter the above to include only a single JavaScript and a single CSS file. Now
      * we're back!
      */
     compile:
     {
         dir: '<%= buildConfig.compileDir %>',
         src: ['<%= buildConfig.compileDir %>/**/*.js', '<%= buildConfig.compileDir %>/assets/**/*.css']
     },
 };
