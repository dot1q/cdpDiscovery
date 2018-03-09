// This is the gulp file for the cos-web yeoman generator package. 
// The build folder contains the dependencies for this file

// Required
var gulp = require('gulp');
var fs = require('fs');

const gulpLoadPlugins = require('gulp-load-plugins');
const isparta = require('isparta');
const reporter = require('jasmine-reporters');
const sequencer = require('run-sequence');
var browserSync = require('browser-sync').create();

// Configuration
import buildConfig from './build/config';
import pm2 from 'pm2';

// load the individual tasks

// Scripts  //
// The scripts below can be invoked using the task names as agruments

let options = {
	pattern: ['build/tasks/**/*.js'],
	config: buildConfig.config
};

let plugins = {
  gulpPlugins: gulpLoadPlugins(),
  pm2: pm2,
  fs: fs,
  isparta: isparta,
  reporter: reporter,
  browserSync: browserSync,
  sequencer: sequencer
};

//let loadedGulpTasks = loadGulpTasks('build/tasks', gulp, options, plugins);
require ('load-gulp-tasks')(gulp, options, plugins);

//gulp.task('serve', (callback) => sequencer('clean','copy:backend', 'babel:backend', 'pm2', callback));
gulp.task('serve', (callback) => sequencer('build', 'browser-sync', 'watch', 'pm2', callback));
gulp.task('build', (callback) => sequencer('clean', 'copy:backend', 'babel:backend', 'copy:frontend', 'copyVendorFiles', 'inject', 'webpack', 'sass', callback));
gulp.task('live-reload', (callback) => sequencer('copy:frontend', 'copyVendorFiles', 'inject', 'webpack', 'sass', 'browser-sync:reload', callback));



// Default task
gulp.task('default', function() {
  console.log('No arguments provided.');
});
