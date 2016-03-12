'use strict';

var gulp 		 = require('gulp'),
	sass		 = require('gulp-sass'),
	uglify 		 = require('gulp-uglify'),
	gulpif 		 = require('gulp-if'),
    concat       = require('gulp-concat'),
	browserify	 = require('browserify'),
    source       = require('vinyl-source-stream'),
    buffer       = require('vinyl-buffer'),
	htmlmin      = require('gulp-htmlmin'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync  = require('browser-sync').create(),
    sassStyle,
    env,
    outputDir;

// env = process.env.NODE_ENV || 'development';
env = 'development';

if(env==='development') {
	outputDir = 'builds/development/';
	sassStyle = 'expanded';
} else {
	outputDir = 'builds/production/';
	sassStyle = 'compressed';
}
    
var jsSources = ['components/scripts/fetch.js'];
var sassSources = ['components/sass/style.scss'];
var htmlSources = [outputDir + '*.html'];


gulp.task('autoprefix', function() {
    return gulp.src(sassSources)
    .pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
	}))
    .pipe(gulp.dest(outputDir + 'css'));
});

gulp.task('sass', function() {
	return gulp.src(sassSources)
	.pipe(sass({
		outputStyle: sassStyle
	}))
    // .pipe(autoprefixer('last 2 versions'))
	.pipe(gulp.dest(outputDir + 'css'));
    // .pipe(browserSync.stream());
});

gulp.task('html', function() {
	return gulp.src('builds/development/*.html') //always read index @dev
	.pipe(gulpif(env === 'production', htmlmin({collapseWhitespace: true})))
	.pipe(gulpif(env === 'production', gulp.dest(outputDir)));
});

gulp.task('js', function() {
    return browserify(jsSources)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
	.pipe(gulpif(env === 'production', uglify()))
    .pipe(gulp.dest(outputDir + 'js'));
});

//browserSync sass watch
gulp.task('sass-watch', ['sass'], browserSync.reload);
gulp.task('js-watch', ['js'], browserSync.reload);

// monitor changes, Ctrl + C to stop watch task
gulp.task('serve', ['sass'], function() {
    console.log(gulp);
	// browserSync({
	// 	server: {
	// 		baseDir: outputDir //location of index.html
	// 	}
	// });
    // browserSync.init({
    //    server: outputDir
    // });
	// gulp.watch(jsSources, ['js-watch']);
	gulp.watch('components/sass/*.scss', ['sass']);
	// gulp.watch('builds/development/*.html').on('change',browserSync.reload);
	// gulp.watch('builds/development/*.html', ['html']);
	// gulp.watch('builds/development/js/*.json', ['json']);
	// gulp.watch('builds/development/images/**/*.*', ['images']);
});

gulp.task('default', ['js', 'sass', 'html']);