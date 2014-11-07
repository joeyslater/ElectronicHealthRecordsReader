 /**
  * `grunt rev` appends a unique hash to the filename for cache busting.
  */
 module.exports = {
     files:
     {
         src: ['<%=concat.buildCSS.dest%>', '<%=concat.compileJS.dest%>']
     }
 };
