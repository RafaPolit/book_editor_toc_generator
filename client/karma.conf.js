module.exports = function(config) {
  
  config.LOG_INFO

  config.set({
    // Karma configuration

    // base path, that will be used to resolve files and exclude
    basePath : '',

    // list of files / patterns to load in the browser
    files : [
      'components/jquery-1.11.1.min.js',
      'components/angular.js',
      'components/angular-route.js',
      'components/angular-resource.js',
      'components/angular-mocks.js',
      'components/underscore-min.js',
      'scripts/**/*module.js',
      'scripts/**/*.js'
    ],

    frameworks : ['jasmine'],

    // list of files to exclude
    exclude : [],


    // test results reporter to use
    // possible values: dots || progress || growl
    reporters : ['progress'],

    // web server port
    port : 8080,

    // cli runner port
    runnerPort : 9100,

    // enable / disable colors in the output (reporters and logs)
    colors : true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch : true,

    // Start these browsers:
    browsers : ['PhantomJS'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout : 5000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun : false

  });
}
