"use strict"

// import necessary modules
const gulp 	  = require('gulp');
const watch   = require('gulp-watch');
const babel   = require('gulp-babel');
const del     = require('del');
const jshint  = require('gulp-jshint');
const stylish = require('jshint-stylish');
const chmod   = require('gulp-chmod');



// lint dist
// TODO: how do I halt build until linting issues are resolved?
gulp.task('lint:dist', function() {
  return gulp.src(
	  		[
				'modules/**/*.es6',
				'!modules/**/*-spec.es6',
				'!modules/**/*-stress.es6'
	  		])
            .pipe(jshint())
            .pipe(jshint.reporter(stylish));
});



// clean dist
// Note: how do I only clean files that were updated?
gulp.task('clean:dist',['lint:dist'], () => {
    return del(['dist']);
});



// build dist
// ToDo: how do I only process files that were updated?
gulp.task('build:dist', ['clean:dist'], () => {
	return gulp.src(
					[
						'modules/**/*.es6',
						'!modules/**/*-spec.es6',
						'modules/**/*-stress.es6',
						'!modules/_templates/**/*.*'
					]
				)
				.pipe(babel({
					presets: ['es2015']
				}))
				.pipe(gulp.dest('dist'));
});



// lint test
// TODO: how do I halt build until linting issues are resolved?
gulp.task('lint:test', function() {
	return gulp.src(
			  		[
						'modules/**/*-spec.es6',
						'modules/**/*-stress.es6',
						'!modules/_templates/**/*.*'
			  		]
		  		)
	            .pipe(jshint())
	            .pipe(jshint.reporter(stylish));
});



// clean test
// Note: how do I only clean files that were updated?
gulp.task('clean:test',['lint:test'], () => {
    return del(['test']);
});




// build test 
gulp.task('build:test', ['clean:test'], () => {
	return gulp.src(
					[
						'modules/**/*-spec.es6',
						'!modules/**/*-stress.es6',
						'!modules/_templates/**/*.*'
					]
				)
				.pipe(babel({
					presets: ['es2015']
				}))
				.pipe(gulp.dest('test'));
});



// chmod
gulp.task('chmod', ['build:dist','build:test'], () => {

	// make all main.js and *-stress.js files into executables
	gulp.src(
				[
					'dist/**/main.js',
					'dist/**/*-stress.js'
				]
		)
		.pipe(
			chmod({
				owner: {
					read: true,
					write: true,
					execute: true
				},
				group: {
					read: true,
					write: true,
					execute: true
				},
				others: {
					read: true,
					write: true,
					execute: true
				}
			})
		)
        .pipe(gulp.dest('dist'))
});



// watch 
gulp.task('watch', ['chmod'], () => {
    gulp.watch('modules/**/*.es6', ['chmod']);
});
// TODO: fix bug
// 1-) watch task doesn't fire
// 2-) it cranks up the cpu to max!
//gulp.task('watch', ['build:dist','build:test'], () => {
//    
//	return watch('./**/*.es6', function () {
//				// modules -> dist
//				gulp.src(
//						[
//							'modules/**/*.es6',
//							'!modules/**/*-spec.es6',
//							'!modules/**/*-stress.es6',
//							'!modules/_templates/**/*.*'
//						]
//					)
//					.pipe(gulp.dest('dist'))
//				;
//
//				// specs & stress -> test
//				gulp.src(
//						[
//							'modules/**/*-spec.es6',
//							'modules/**/*-stress.es6',
//							'!modules/_templates/**/*.*'
//						]
//					)
//					.pipe(gulp.dest('test'))
//				;
//			})
//	;
//});



// default task
gulp.task('default', ['watch']);

