/**
 * This file/module contains the configuration options for the build & run process.
 */
module.exports = {

	/**
	 * You will want to configure the proxy below to point to your backing application.
	 */

	/**
	 * The `buildDir` folder is where our projects are compiled during development and the `compileDir` folder is where our app resides once it's completely
	 * built.
	 */
	buildDir: 'target',
	compileDir: 'target/bin',

	/**
	 * This is a collection of file patterns that refer to our app code (the stuff in `src/`). These file paths are used in the configuration of build tasks.
	 * `js` is all project javascript, scss tests. `ctpl` contains our reusable components' (`src/common`) template HTML files, while `atpl` contains the same,
	 * but for our app's code. `html` is just our main HTML file, `scss` is our main stylesheet, and `unit` contains our app's unit tests.
	 */
	appFiles: {
		js: ['src/**/*.js', '!src/**/*.spec.js', '!src/assets/**/*.js'],
		jsunit: ['src/**/*.spec.js'],

		atpl: ['src/app/**/*.tpl.html'],
		ctpl: ['src/common/**/*.tpl.html'],

		html: ['src/index.html'],
		sass: 'src/sass/main.scss'
	},

	/**
	 * This is a collection of files used during testing only.  Before - loaded before your test scripts.  After - well you take a wild guess.
	 */
	testFiles: {
		before: {
			js: []
		},
		after: {
			js: ['vendor/angular-mocks/angular-mocks.js']
		}
	},

	/**
	 * This is the same as `appFiles`, except it contains patterns that reference vendor code (`vendor/`) that we need to place into the build process
	 * somewhere. While the `appFiles` property ensures all standardized files are collected for compilation, it is the user's job to ensure non-standardized
	 * (i.e. vendor-related) files are handled appropriately in `vendorFiles.js`. The `vendorFiles.js` property holds files to be automatically concatenated
	 * and minified with our project source files. The `vendorFiles.css` property holds any CSS files to be automatically included in our app. The
	 * `vendorFiles.assets` property holds any assets to be copied along with our app's assets. This structure is flattened, so it is not recommended that you
	 * use wildcards.
	 */
	vendorFiles: {
		js: [
			'vendor/lodash/dist/lodash.js',
			'vendor/modernizr/custom.modernizr.js',
			'vendor/fastclick/lib/fastclick.js',
			'vendor/json3/lib/json3.js',
			'vendor/es5-shim/es5-shim.js',
			'vendor/angular/angular.js',
			'vendor/angular-cookies/angular-cookies.js',
			'vendor/angular-resource/angular-resource.js',
			'vendor/underscore/underscore.js',
			'vendor/restangular/src/restangular.js',
			'vendor/angular-route/angular-route.js',
			'vendor/jquery/dist/jquery.js',
			'vendor/bootstrap-sass-official/assets/javascripts/bootstrap.js',
			'vendor/angular-bootstrap/ui-bootstrap.js',
			'vendor/angular-bootstrap/ui-bootstrap-tpls.js',
			'vendor/angular-ui-router/release/angular-ui-router.js',
			'vendor/angular-ui-grid/ui-grid.js',
			'vendor/angular-google-chart/ng-google-chart.js'
		],
		css: [
			'vendor/bootstrap-sass-official/assets/stylesheets/bootstrap/*',
			'vendor/angular-ui-grid/ui-grid.css'
		],
		assets: [
			'assets/images/*',
			'vendor/angular-ui-grid/ui-grid.svg',
			'vendor/angular-ui-grid/ui-grid.ttf',
			'vendor/angular-ui-grid/ui-grid.woff',
			'assets/bootstrap/*'
		]
	}
};
