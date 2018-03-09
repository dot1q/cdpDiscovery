import path from 'path';

module.exports = function(gulp, options, plugins) {
  gulp.task('pre-test', () => {
    return gulp.src(options.config.src.babel)
      // gulp-jasmine works on filepaths so you can't have any plugins before it 
      .pipe(plugins.gulpPlugins.istanbul({
        instrumenter: plugins.isparta.Instrumenter
      }))
      .pipe(plugins.gulpPlugins.istanbul.hookRequire());
  });
  
  gulp.task('ci', ['pre-test'], () => {
    return gulp.src(options.config.test)
      // gulp-jasmine works on filepaths so you can't have any plugins before it 
      .pipe(plugins.gulpPlugins.jasmine({
        reporter: new plugins.reporter.JUnitXmlReporter({
          savePath: options.config.destDir + '/coverage'
        })
      }))
      .pipe(plugins.gulpPlugins.istanbul.writeReports({
        dir: path.join(options.config.destDir,'coverage')
      }))
      //.pipe(plugins.gulpPlugins.istanbul.enforceThresholds({ thresholds: { global: 90 } }))
      .pipe(plugins.gulpPlugins.exit());
  });
  
  gulp.task('test', () => {
    return gulp.src(options.config.test)
      .pipe(plugins.gulpPlugins.jasmine({
        verbose: true
      }))
      .once('end', function () {
          process.kill(process.pid, 'SIGINT');
          setTimeout(function() {
              /* eslint-disable */
              process.exit(0);
              /* eslint-enable */
          }, 100);
      });
  });
  
};
