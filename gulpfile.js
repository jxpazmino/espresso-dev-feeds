'use strict';

var gulp 		 = require('gulp'),
    handlebars   = require('gulp-compile-handlebars'),
    rename       = require('gulp-rename'),
	uglify 		 = require('gulp-uglify'),
	gulpif 		 = require('gulp-if'),
    concat       = require('gulp-concat'),
	browserify	 = require('browserify'),
    source       = require('vinyl-source-stream'),
    buffer       = require('vinyl-buffer'),
	htmlmin      = require('gulp-htmlmin'),
	sass		 = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
    sassStyle,
    env,
    outputDir;
    
    
env = process.env.NODE_ENV || 'development';
env = 'production';

if(env==='development') {
	outputDir = 'builds/development/';
	sassStyle = 'expanded';
} else {
	outputDir = 'builds/production/';
	sassStyle = 'compressed';
}
    
var jsSources = ['components/scripts/app.js'],
    sassSources = ['components/sass/style.scss'];

gulp.task('js', function() {
    return browserify(jsSources)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
	.pipe(gulpif(env === 'production', uglify()))
    .pipe(gulp.dest(outputDir + 'js'));
});

gulp.task('sass', function() {
	return gulp.src(sassSources)
	.pipe(sass({
		outputStyle: sassStyle
	}))
    // .pipe(autoprefixer('last 2 versions')) // doesnt work for some reason, probably my old version of node
	.pipe(gulp.dest(outputDir + 'css'));
});

gulp.task('html', function() {
	return gulp.src('builds/development/*.html') //always read index @dev
	.pipe(gulpif(env === 'production', htmlmin({collapseWhitespace: true})))
	.pipe(gulpif(env === 'production', gulp.dest(outputDir)));
});

gulp.task('default', ['js', 'sass', 'html']);
    