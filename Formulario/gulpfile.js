var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    htmlmin = require('gulp-htmlmin'),
    gutil = require('gulp-util'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass');

//Node server
var EXPRESS_PORT = 7000;
var EXPRESS_ROOT = '../release/formulario';
function startExpress() {
  var express = require('express');
  var app = express();
  app.use(express.static(EXPRESS_ROOT));
  app.listen(EXPRESS_PORT);
  console.log('Listening on port  http://localhost:'+EXPRESS_PORT)
}
gulp.task('html', function() {
  gulp.src('index.html')
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true, removeCommentsFromCDATA: true, removeAttributeQuotes: true}))
    .pipe(gulp.dest('../release/Formulario'))
    .pipe(notify({ message: 'HTML task complete' }));
});

gulp.task('templates', function() {
  gulp.src('Templates/*.html')
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true, removeCommentsFromCDATA: true, removeAttributeQuotes: true}))
    .pipe(gulp.dest('../release/Formulario/templates/'))
    .pipe(notify({ message: 'Templates task complete' }));
});

gulp.task('default', function () {
    gulp.src('scss/**/*.scss')
        .pipe(watch(function(files) {
            return files.pipe(sass())
                .pipe(gulp.dest('./dist/'));
        }));
});

gulp.task('styles', function() {
  return gulp.src(['css/*.css'])
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(concat('production.css'))
    .pipe(gulp.dest('css/build'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('../release/formulario/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('sass', function () {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});

gulp.task('scripts', function() {
  return gulp.src([ 'js/modules/*.js',
                    'js/*.js'])
    .pipe(concat('production.js'))
    .pipe(gulp.dest('js/build'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('../release/formulario/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
  return gulp.src('img/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('../release/formulario/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('clean', function() {
  return gulp.src(['../release/formulario/css', '../release/formulario/js', '../release/formulario/img', '../release/formulario/html' ], {read: false})
    .pipe(clean());
});

gulp.task('watch', function() {
  //Start Server and LiveReload
  startExpress();
  gulp.watch('scss/*.scss', ['sass']);
  gulp.watch('css/**/*.css', ['styles']);
  // Watch .js files
  gulp.watch('js/**/*.js', ['scripts']);
  // Watch image files
  gulp.watch('img/**/*', ['images']);
  gulp.watch('index.html', ['html']); 
  gulp.watch('templates/*.html', ['templates']);    

});
    
gulp.task('default', function() {
    gulp.start('html', 'templates','sass', 'styles', 'scripts', 'images');
});