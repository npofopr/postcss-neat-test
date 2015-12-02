'use strict';

var gulp = require('gulp'),
	watch = require('gulp-watch'),
	/* -- */
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	precss = require('precss'),
	minmax = require('postcss-media-minmax'),
	PostcssNeat = require('postcss-neat'),
	/* -- */
	sourcemaps = require('gulp-sourcemaps'),
	browserSync = require('browser-sync'),
	pkg = require('./package.json'),
	reload = browserSync.reload;

var path = {
	build: {
		html: 'build/',
		css: 'build/css/',
	},
	src: {
		html: 'src/*.html',
		css: 'src/css/style.css',
	},
	watch: {
		html: 'src/**/*.html',
		css: 'build/css/',
	},
	clean: './build'
};

var config = {
	server: {
		baseDir: "./build"
	},
	tunnel: false,
	host: 'localhost',
	port: 9000,
	logLevel: "silent",
	notify: false,
	ghostMode: false,
	online: false,
	open: true
};

gulp.task('webserver', function () {
	browserSync(config);
});

gulp.task('html', function () {
	gulp.src(path.src.html)
		.pipe(gulp.dest(path.build.html));
});

gulp.task('css', function () {
	var processors = [
		autoprefixer({
			browsers: ['> 1%', 'last 2 version', 'IE 9']
		}),
		precss,
		minmax,
		PostcssNeat,
	];
	gulp.src(path.src.css)
		.pipe(sourcemaps.init())
		.pipe(postcss(processors))
		.pipe(gulp.dest(path.build.css))
		.pipe(reload({stream: true}));
});


gulp.task('build', [
	'html',
	'css'
]);

gulp.task('watch', function(){
	gulp.watch([path.src.html], ["html"]);
	gulp.watch([path.src.css], ["css"]);
});

gulp.task('default', ['build', 'webserver', 'watch']);
