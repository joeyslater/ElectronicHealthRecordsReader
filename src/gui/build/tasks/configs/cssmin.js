module.exports = {
  options: {
    report: 'min'
  },
  compile: {
    src: '<%= buildConfig.compileDir %>/main.css',
    dest: '<%= buildConfig.compileDir %>/main.css'
  }
};
