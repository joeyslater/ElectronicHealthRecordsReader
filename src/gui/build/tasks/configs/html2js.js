/**
 * HTML2JS is a Grunt plugin that takes all of your template files and places them into JavaScript files as strings that are added to AngularJS's
 * template cache. This means that the templates too become part of the initial payload as one JavaScript file.
 */
module.exports = {
    /**
     * These are the templates from `src/app`.
     */
    app:
    {
        options:
        {
            base: 'src/app'
        },
        src: ['<%= buildConfig.appFiles.atpl %>'],
        dest: '<%= buildConfig.buildDir%>/templates-app.js'
    },

    /**
     * These are the templates from `src/common`.
     */
    common:
    {
        options:
        {
            base: 'src/common'
        },
        src: ['<%= buildConfig.appFiles.ctpl %>'],
        dest: '<%= buildConfig.buildDir%>/templates-common.js'
    }
};
