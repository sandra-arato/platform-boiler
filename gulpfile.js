var gulp = require('gulp'),
	babel = require('gulp-babel'),
	babelify = require('babelify'),
	browserify = require('browserify'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	source = require('vinyl-source-stream'),
	handlebars = require('gulp-handlebars'),
	wrap = require('gulp-wrap'),
	declare = require('gulp-declare'),
	sass = require('gulp-ruby-sass'),
	critical = require('critical'),
	a11y = require('gulp-a11y');

// this task compiles Sass to CSS
gulp.task('process-styles', function(){
	return sass('src/styles/main.scss', {
		style: 'expanded',
		loadPath: [
			'src/styles/_normalize.scss'
		]})
		.pipe(gulp.dest('src/styles'))
		.pipe(gulp.dest('dist/styles'));
});

// this task takes the hbs templates and 
// precompiles them to templates.js
// templates.js exports as a module
gulp.task('templates', function(){
	return gulp.src('src/templates/*.hbs')
	.pipe(handlebars())
	.pipe(declare({
		root: 'templates',
		noRedeclare: true
	}))
	.pipe(concat('templates.js'))
	.pipe(wrap('var templates = templates || {};\n<%= contents %> \nmodule.exports = templates;'))
	.pipe(gulp.dest('src/scripts/modules'));
});

// this task watches the main.js and module files 
// that are written in ES6
// it transpiles them to ES5 into all.js
gulp.task('transpile-scripts', function(){
	return gulp.src(['src/scripts/main.js', 'src/scripts/modules/*.js'])
	.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat('all.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('src/scripts'));
});

// this task takes all.js and assembles 
// the required dependencies to output.js
gulp.task('modules', function() {
	browserify({
	entries: './src/scripts/all.js',
	debug: true
	})
	.transform(babelify)
	.bundle()
	.pipe(source('output.js'))
	.pipe(gulp.dest('./dist/scripts'));
});

// this watches files in the src folder
gulp.task('watch', function(){
	gulp.watch('src/templates/*.hbs', ['templates']);
	gulp.watch('src/scripts/main.js', ['transpile-scripts']);
	gulp.watch('src/scripts/all.js', ['modules']);
	gulp.watch('src/styles/*.scss', ['process-styles']);
});

// this task inlines CSS above the fold (mobile)
gulp.task('critical', ['process-styles'], function() {
	critical.generateInline({
		base: 'src/',
		src: 'index.html',
		styleTarget: 'dist/styles/main-critical.css',
		htmlTarget: 'dist/index.html',
		width: 420,
		height: 720,
		minify: true
	});
});

// this task checks accessibility on HTML files
gulp.task('check-a11y', function() {
	return gulp.src('./dist/*.html')
    .pipe(a11y())
    .pipe(a11y.reporter());
});

gulp.task('build', ['templates', 'transpile-scripts', 'critical'], function(){
	gulp.run('check-a11y');
});

gulp.task('default', function(){
	gulp.run('templates');
	gulp.run('transpile-scripts');
});