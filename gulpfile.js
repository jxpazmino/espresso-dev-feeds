'use strict';

var gulp 		 = require('gulp'),
    handlebars   = require('gulp-compile-handlebars'),
    rename       = require('gulp-rename'),
    // speakers     = require('./components/json/feed.json'),
	uglify 		 = require('gulp-uglify'),
	gulpif 		 = require('gulp-if'),
    concat       = require('gulp-concat'),
	browserify	 = require('browserify'),
    source       = require('vinyl-source-stream'),
    buffer       = require('vinyl-buffer'),
	htmlmin      = require('gulp-htmlmin'),
	// sass		 = require('gulp-sass'),
	// autoprefixer = require('gulp-autoprefixer'),
	browserSync  = require('browser-sync').create(),
    sassStyle,
    env,
    outputDir;
    
var data = require('./components/json/feed.json');
    
// env = process.env.NODE_ENV || 'development';
env = 'development';

if(env==='development') {
	outputDir = 'builds/development/';
	sassStyle = 'expanded';
} else {
	outputDir = 'builds/production/';
	sassStyle = 'compressed';
}
    
var jsSources = ['components/scripts/app.js'];    
    
gulp.task('handlebars', function() {
    gulp.src('templates/*.hbs')
        .pipe(handlebars(data))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('builds/development/'));
});


// gulp.task('js', function() {
//     return gulp.src(jsSources)
// 	.pipe(concat('bundle.js'))
// 	// .pipe(uglify())
// 	.pipe(gulpif(env === 'production', uglify()))
// 	.pipe(gulp.dest(outputDir + 'js'));
// });


gulp.task('js', function() {
    return browserify(jsSources)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
	// .pipe(gulpif(env === 'production', uglify()))
	.pipe(uglify())
    .pipe(gulp.dest(outputDir + 'js'));
});

gulp.task('default', ['js']);
    
    
/*

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



//browserSync sass watch
gulp.task('sass-watch', ['sass'], browserSync.reload);
gulp.task('js-watch', ['js'], browserSync.reload);
*/
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

// gulp.task('default', ['js', 'sass', 'html']);

////////////////////////////////////////////////////////

/*
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');

gulp.task('default', ['templates','scripts'], function () {
    console.log('running gulp');
});


gulp.task('templates', function () {
    return gulp.src('templates/*.hbs')
      .pipe(handlebars())
    //   .pipe(wrap('Handlebars.template(<%= contents %>)'))
    //   .pipe(declare({
    //       namespace: 'MyApp.templates',
    //       noRedeclare: true, // Avoid duplicate declarations
    //   }))
      .pipe(concat('templates.js'))
      .pipe(wrap('var Handlebars = require("handlebars");\n <%= contents %>'))
      .pipe(gulp.dest('components/compiled/js'));
});

gulp.task('scripts', ['templates'], function () {
    return gulp.src(['components/compiled/js/templates.js', 'components/scripts/app.js'])
      .pipe(concat('bundle.js'))
      .pipe(uglify())
      .pipe(gulp.dest('builds/development/js/'));
});





// return browserify(jsSources)
//     .bundle()
//     .pipe(source('bundle.js'))
//     .pipe(buffer())
// 	.pipe(gulpif(env === 'production', uglify()))
//     .pipe(gulp.dest(outputDir + 'js'));

*/