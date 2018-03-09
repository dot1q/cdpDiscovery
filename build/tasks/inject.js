module.exports = function(gulp, options, plugins) {

	gulp.task('inject', function() {
    /**
     *  Source & destination files for injection
     **/
    let sourceFiles = gulp.src(options.config.inject.targetFiles, {cwd: options.config.inject.cwd});
    let destFiles = options.config.destDir+'/frontend';
    
    /** 
     *  Injection files
     **/
    // These are files that get injected into every html file
    let commonInject = gulp.src(options.config.vendorFiles.common, {read: false, cwd: destFiles});
    console.log(options.config.vendorFiles.common);
    
    return sourceFiles
      .pipe( plugins.gulpPlugins.inject(commonInject, {    // common inject
        relative: true,
      }))
      .pipe(gulp.dest(destFiles));
    
	});


};
