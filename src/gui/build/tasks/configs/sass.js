 /**
  * `sass` handles our SASS compilation and uglification automatically. Only our `main.sass` file is included in compilation; all other files must be
  * imported from this file.
  */
 module.exports = {
     build:
     {
         options:
         {
             style: 'expanded'
         },
         files:
         {
             '<%= buildConfig.buildDir %>/assets/main.css': '<%= buildConfig.appFiles.sass%>'
         }
     },
 };
