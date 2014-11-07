 /**
  * The `copy` task just copies files from A to B. We use it here to copy our project assets (images, fonts, etc.) and javascripts into `buildDir
  * and then to copy the assets to `compileDir`.
  */
 module.exports = {
     appAssets:
     {
         files: [
         {
             src: ['**'],
             dest: '<%= buildConfig.buildDir%>/assets/',
             cwd: 'src/assets',
             expand: true
         }]
     },
     appAssetsCompile:
     {
         files: [
         {
             src: ['**'],
             dest: '<%= buildConfig.compileDir%>/assets/',
             cwd: 'src/assets',
             expand: true
         }]
     },
     appJS:
     {
         files: [
         {
             src: ['<%= buildConfig.appFiles.js %>'],
             dest: '<%= buildConfig.buildDir%>/',
             cwd: '.',
             expand: true
         }]
     },
     vendorAssets:
     {
         files: [
         {
             src: ['<%= buildConfig.vendorFiles.assets %>'],
             dest: '<%= buildConfig.buildDir%>/assets/',
             cwd: '.',
             expand: true,
             flatten: true
         }]
     },
     vendorJS:
     {
         files: [
         {
             src: ['<%= buildConfig.vendorFiles.js %>'],
             dest: '<%= buildConfig.buildDir%>/',
             cwd: '.',
             expand: true
         }]
     },
     vendorCSS:
     {
         files: [
         {
             src: ['<%= buildConfig.vendorFiles.css %>'],
             dest: '<%= buildConfig.buildDir%>/',
             cwd: '.',
             expand: true
         }]
     }
 };
