var gulp        	= require('gulp');
var sass        	= require('gulp-sass');
var pug        		= require('gulp-pug');
var browserSync 	= require('browser-sync').create();
const autoprefixer 	= require('gulp-autoprefixer');

//sass
gulp.task('sass', function(){
	return gulp.src('./src/scss/main.scss')
		.pipe(sass({ style: 'compressed' }))
		.pipe(autoprefixer('last 10 version'))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

//pug
gulp.task('pug',function () {
	var database = require('./src/pug/db/database.json');
	return gulp.src('./src/pug/**/*.pug')
		.pipe(pug({'pretty':true,'locals':database}))
		.pipe(gulp.dest('./dist'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

//server
gulp.task('serve', ['sass'], function() {
	browserSync.init({
		server: "./dist"
	});
});

// Default task
gulp.task('default', ['sass', 'pug','serve'], function () {
	gulp.watch("./src/scss/**/*.scss", ['sass']);
	gulp.watch('./src/pug/**/*.pug', ['pug']);
	gulp.watch('./src/pug/db/*.json', ['pug']);
});

