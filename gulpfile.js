var gulp = require('gulp');
var connect = require('gulp-connect');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('build', function() {
     gulp.src('./ng-vibrate.js')
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(rename({
             suffix: '.min'
         }))
        .pipe(gulp.dest('./'));
});


gulp.task('serve', function() {
    connect.server({
        root: './',
        livereload: true
    });
});

