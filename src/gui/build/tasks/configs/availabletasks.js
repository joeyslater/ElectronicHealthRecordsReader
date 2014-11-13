module.exports = {
  tasks: {
    options: {
      filter: 'include',
      tasks: ['default', 'copyContent', 'testOnce', 'testContinuous', 'ci', 'serve', 'build', 'compile'],
      sort: true,
      descriptions: {
        'default': 'The default task is to compile',
        'copyContent': 'This is not called directly but composes all the copy tasks for css & js.',
        'testOnce': 'This sets up the Karma server and tests to run once',
        'testContinuous': 'This sets up the Karma server to run in the background. `karma:unit:run` task in the watch/delta config file actually runs the tests.',
        'ci': 'The `ci` task is for running your continous build on Jenkins',
        'serve': 'The `serve` task boots up a local node server & configures its proxies, runs the watch task, and opens your browser to the index.html page',
        'build': 'The `build` task gets your app ready to run for development and testing.',
        'compile': 'The `compile` task gets your app ready for deployment by concatenating and minifying your code'
      }
    }
  }
};
