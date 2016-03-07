'use strict';

var gulp 		= require('gulp'),
	sass		= require('gulp-sass'),
	uglify 		= require('uglify'),
	gulpif 		= require('gulp-if'),
    concat      = require('gulp-concat'),
	browserify	= require('browserify'),
	minifyHTML  = require('gulp-minify-html'),
	autoprefixer= require('gulp-autoprefixer'),
	browserSync = require('browser-sync');

var sassStyle,
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
    
var jsSources = ['components/scripts/test.js'];
var sassSources = ['components/sass/style.css'];
var htmlSources = [outputDir + '*.html'];



gulp.task('sass', function() {
	return gulp.src(sassSources)
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(sass({
		outputStyle: sassStyle
	}))
	.on('error', console.log('sass error'))
	.pipe(gulp.dest(outputDir + 'css'));
});


gulp.task('html', function() {
	return gulp.src('bulds/development/*.html') //always read index from development
	.pipe(gulpif(env === 'production', minifyHTML()))
	.pipe(gulpif(env === 'production', gulp.dest(outputDir)));
});

gulp.task('js', function() {
	return gulp.src(jsSources)
	.pipe(concat('bundled.js'))
	.pipe(browserify())
	.pipe(gulpif(env === 'production', uglify()))
	.pipe(gulp.dest(outputDir + 'js'));
});

//browserSync sass watch
gulp.task('sass-watch', ['sass'], browserSync.reload);

// monitor changes, Ctrl + C to stop watch task
gulp.task('watch', function() {
	browserSync({
		server: {
			baseDir: outputDir //location of index.html
		}
	});
	gulp.watch(jsSources, ['js']);
	gulp.watch('builds/development/*.html', ['html']);
	gulp.watch('builds/development/js/*.json', ['json']);
	gulp.watch('builds/development/images/**/*.*', ['images']);
	gulp.watch('components/sass/*.scss', ['sass-watch']);
});

gulp.task('default', ['coffee', 'js', 'sass', 'images', 'watch']);