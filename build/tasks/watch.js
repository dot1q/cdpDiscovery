module.exports = function(gulp, options, plugins) {
  
  gulp.task('watch', function () {
      // Endless stream mode
      return gulp.watch( options.config.watch, ['live-reload']);
  });


};