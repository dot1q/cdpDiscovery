module.exports = function(gulp, options, plugins) {

	gulp.task('sass', function() {
    return gulp.src(options.config.sass)
      .pipe(plugins.gulpPlugins.sass().on('error', plugins.gulpPlugins.sass.logError))
      .pipe(gulp.dest(options.config.destDir+'/frontend'))
	});
};
