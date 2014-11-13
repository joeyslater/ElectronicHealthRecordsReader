module.exports = {
    build:
    {
        dir: '<%= buildConfig.buildDir %>',
        src: [
            '<%= buildConfig.testFiles.before.js %>',
            '<%= buildConfig.vendorFiles.js %>',
            '<%= html2js.app.dest %>',
            '<%= html2js.common.dest %>',
            '<%= buildConfig.testFiles.after.js %>'
        ]
    }
};
