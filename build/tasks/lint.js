import path from 'path';

module.exports = function(gulp, options, plugins) {

	gulp.task('lint', function() {
    console.log(path.join(__dirname,"../../.eslintrc"));
    return gulp.src(options.config.src.babel)
      .pipe(plugins.gulpPlugins.eslint(
        path.join(__dirname,"../../.eslintrc")
      ))
      // .pipe(reload({stream: true, once: true}))
      .pipe(plugins.gulpPlugins.eslint.format())
      .pipe(plugins.gulpPlugins.eslint.failAfterError());
      //.pipe(plugins.gulpPlugins.if(isFixed, gulp.dest('.', {cwd: './src' })));
  });

  /*function isFixed(file) {
    return file.eslint && file.eslint.fixed;
  }*/

};
