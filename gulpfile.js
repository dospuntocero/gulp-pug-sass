var gulp        = require('gulp');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var pug         = require('gulp-pug');
var browserSync = require('browser-sync').create();
var plumber     = require('gulp-plumber');

const autoprefixer = require('gulp-autoprefixer');

//sass
gulp.task('sass', function(){
	return gulp.src('./src/scss/main.scss')
		.pipe(sourcemaps.init())
		.pipe(plumber())
		.pipe(sass({ style: 'compressed' }))
		.pipe(autoprefixer('last 10 version'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.reload({stream: true}));
});

//pug
gulp.task('pug',function () {
	var database = require('./src/pug/db/database.json');
	return gulp.src('./src/pug/**/*.pug')
		.pipe(plumber())
		.pipe(pug({'pretty':true,'locals':database}))
		.pipe(gulp.dest('./dist'))
		.pipe(browserSync.reload({stream: true}));
});

//copy images to the dist folder
gulp.task('images',function () {
	gulp.src('./src/images/**.*')
		.pipe(gulp.dest('./dist/images'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('copy', function () {
	gulp.src('./src/js/**.*')
		.pipe(gulp.dest('./dist/js'))
		.pipe(browserSync.reload({stream: true}));
});
//server
gulp.task('serve', ['sass'], function() {
	browserSync.init({
   server: "./dist"
 });
});


// Default task
gulp.task('default', ['sass', 'pug','images','copy','serve'], function () {
	gulp.watch("./src/js/**.*", ['copy']);
	gulp.watch("./src/images/**.*", ['images']);
	gulp.watch("./src/scss/**/**/*.scss", ['sass']);
	gulp.watch('./src/pug/**/*.pug', ['pug']);
	gulp.watch('./src/pug/db/*.json', ['pug']);
});
