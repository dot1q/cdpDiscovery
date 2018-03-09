module.exports = function(gulp, options, plugins) {

  gulp.task('browser-sync', function() {

    let server = plugins.browserSync.init({
        port: 9000,
        timestamps: true,
        notify: true,
        server: {
            baseDir: options.config.destDir+'/frontend'
        }
    });
  });
  
  gulp.task('browser-sync:reload', () => {
    plugins.browserSync.reload();
  });

};


