/**
 * Created by megatron on 15.2.11.
 */
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var watch = require('gulp-watch');
var minify = require('gulp-minify');
var autoprefixer = require('autoprefixer-stylus');
var minifyHTML = require('gulp-minify-html');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

var stylusCssDest = './Public/css/';
//var stylusCssDest = './../utrader/platform/css/';

gulp.task('default', function() {

});
gulp.task('stuff', function () {
    gulp.src('./assets/images/**/*')
        .pipe(watch('./assets/images/**/*'))
        .pipe(gulp.dest('./Public/images/'))
        .pipe(reload({stream:true}));
});

gulp.task('styles', function () {
    gulp.src('./assets/css/*.styl')
        .pipe(watch('./assets/css/*.styl'))
        .pipe(stylus({
            compress: true,
            use: [autoprefixer({ browsers: ['> 1%', 'IE 7'], cascade: false })]
        }))
        .on('error', swallowError)
        .pipe(gulp.dest(stylusCssDest))
        .pipe(reload({stream:true}));
});

gulp.task('compress', function() {
    gulp.src('./assets/js/*.js')
        .pipe(watch('./assets/js/*.js'))
        .pipe(minify({
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest('./Public/js/'))
        .pipe(reload({stream:true}));
});

gulp.task('templates', function() {
    gulp.src('./templates/*.html')
        .pipe(watch('./templates/*.html'))
        .pipe(minifyHTML())
        .pipe(gulp.dest('./Public/'))
        .pipe(reload({stream:true}));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./Public/",
            index  : "index.html"
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['styles', 'compress', 'stuff', 'templates', 'browser-sync']);

function swallowError (error) {
    console.log(error.toString());
    this.emit('end');
}