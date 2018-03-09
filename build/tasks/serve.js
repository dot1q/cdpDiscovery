module.exports = function(gulp, options, plugins) {

	gulp.task('pm2', function() {
        return plugins.pm2.connect(true, function () {
            plugins.pm2.start('pm2.json', function () {
                console.log('pm2 started');
                plugins.pm2.dashboard();
                //pm2.streamLogs('all');
            });
        });
    });
    
    gulp.task('pm2:stop', () => {
        return plugins.pm2.stop('pm2.json', () => {
            
        });
    });
  
};


