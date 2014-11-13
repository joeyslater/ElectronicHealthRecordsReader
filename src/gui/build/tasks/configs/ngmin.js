 /**
  * `ng-min` annotates the sources before minifying. That is, it allows us to code without the array syntax.
  */
 module.exports = {
     compile:
     {
         files: [
         {
             src: ['<%= buildConfig.appFiles.js %>'],
             cwd: '<%= buildConfig.buildDir%>',
             dest: '<%= buildConfig.buildDir%>',
             expand: true
         }]
     }
 };
