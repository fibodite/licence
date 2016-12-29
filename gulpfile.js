var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');
var include = require('gulp-include');
var uglify = require('gulp-uglify');

var cssDestination = './public/temp/css';
var jsDestination = './public/temp/js';

gulp.task('default', [
    'build'
]);

gulp.task('build', [
    'less-vendor',
    'less-highlight',
    'less-custom',
    'scripts-vendor',
    'scripts-highlight',
    'scripts-custom'
]);

gulp.task('less-vendor', function () {
    return gulp
        .src('./public/assets/less/vendor.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            paths: [
                __dirname + '/node_modules'
            ]
        })).on('error', console.log)
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(cssDestination));
});

gulp.task('less-highlight', function () {
    return gulp
        .src('./public/assets/less/highlight.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            paths: [
                __dirname + '/node_modules'
            ]
        })).on('error', console.log)
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(cssDestination));
});

gulp.task('less-custom', function () {
    return gulp
        .src('./public/assets/less/index.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            paths: [
                __dirname + '/node_modules'
            ]
        })).on('error', console.log)
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(cssDestination));
});

gulp.task('scripts-vendor', function () {
    return gulp
        .src('./public/assets/scripts/vendor.js')
        .pipe(sourcemaps.init())
        .pipe(include({
            includePaths: [
                __dirname + '/node_modules'
            ]
        })).on('error', console.log)
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(jsDestination));
});

gulp.task('scripts-highlight', function () {
    return gulp
        .src('./public/assets/scripts/highlight.js')
        .pipe(sourcemaps.init())
        .pipe(include({
            includePaths: [
                __dirname + '/node_modules'
            ]
        })).on('error', console.log)
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(jsDestination));
});

gulp.task('scripts-custom', function () {
    return gulp
        .src('./public/assets/scripts/index.js')
        .pipe(sourcemaps.init())
        .pipe(include({
            includePaths: [
                __dirname + '/node_modules'
            ]
        })).on('error', console.log)
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(jsDestination));
});

gulp.task('clean', function () {
    return gulp
        .src([cssDestination, jsDestination])
        .pipe(clean());
});

gulp.task('watch', function () {
    return gulp
        .watch('./public/assets/less/*.less', ['less-custom'])
        .watch('./public/assets/scripts/*.js', ['scripts-custom']);
});
