'use strict';

var gulp 		 = require('gulp'),
	uglify 		 = require('gulp-uglify'),
	gulpif 		 = require('gulp-if'),
	htmlmin      = require('gulp-htmlmin'),
    browserify	 = require('browserify'),
    source       = require('vinyl-source-stream'),
    buffer       = require('vinyl-buffer'),
	sass		 = require('gulp-sass'),
    sassStyle,
    env,
    outputDir;
    
env = process.env.NODE_ENV || 'development';

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
	.pipe(gulp.dest(outputDir + 'css'));
});

gulp.task('html', function() {
	return gulp.src('builds/development/*.html') //always read index @dev
	.pipe(gulpif(env === 'production', htmlmin({collapseWhitespace: true})))
	.pipe(gulpif(env === 'production', gulp.dest(outputDir)));
});

gulp.task('default', ['js', 'sass', 'html']);
    