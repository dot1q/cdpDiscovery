module.exports = function(gulp, options, plugins) {

  gulp.task('babel:backend', function() {
    return gulp.src(options.config.src.babel).
    pipe(plugins.gulpPlugins.babel()).
    pipe(gulp.dest(options.config.dist+'/backend'));
  });

};
