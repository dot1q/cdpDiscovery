module.exports = function(gulp, options, plugins) {

	gulp.task('copy:backend', function() {
    return gulp.src(options.config.src.files.backend).
    pipe(gulp.dest(options.config.dist+'/backend'));
    });

	gulp.task('copy:frontend', function() {
        return gulp.src(options.config.htmlSrc).
        pipe(gulp.dest(options.config.destDir+'/frontend'));
        });
    
    gulp.task('copyVendorFiles', () => {
        let common = options.config.vendorFiles.common;
        
        return gulp.src([].concat(common), {base: '.'}).
          pipe(gulp.dest(options.config.destDir+'/frontend'));
      });

};
