'use strict';

module.exports = function(grunt) {
	// Time how long Grunt tasks take.
	require('time-grunt')(grunt);

	// Load all Grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Load Lodash for utility functions
	var _ = require('lodash');

	// Load in our build configuration file.  This along with the grunt-tasks should be the
	// only thing you need to modify.
	var buildConfig = require('./build/config.js');

	// Load in our Grunt tasks configuration files.  Note that the file name under tasks/configs is important.
	// It should correspond to the task that you are providing options for.
	var gruntTasksConfig = require('./build/utils/loadTaskConfigs.js');

	// Create our Grunt configuration file.
	var gruntConfig = {
		buildConfig: buildConfig,
		pkg: grunt.file.readJSON('package.json'),
		bower: grunt.file.readJSON('bower.json')
	};

	// Initialize Grunt
	grunt.initConfig(_.extend(gruntConfig, gruntTasksConfig));

	// Load our Grunt tasks including any custom ones.
	require('./build/tasks/grunt.js')(grunt);
};
