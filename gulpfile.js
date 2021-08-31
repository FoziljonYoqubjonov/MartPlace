let gulp = require('gulp'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  browserSync = require('browser-sync'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  cssmin = require('gulp-cssmin');



gulp.task('sass', function() {
  return gulp.src('app/scss/style.scss')
    .pipe(sass())
    .pipe(rename({ suffix: '.min' }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 8 versions']
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({ stream: true }))


});
gulp.task('script', function() {
  return gulp.src([
      'node_modules/slick-carousel/slick/slick.js',
      'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
      'node_modules/mixitup/dist/mixitup.js',
      'node_modules/rateyo/min/jquery.rateyo.min.js',
      'node_modules/ion-rangeslider/js/ion.rangeSlider.js'
    ])
    .pipe(concat('lib.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
});

gulp.task('style', function() {
  return gulp.src([
      'node_modules/normalize.css/normalize.css',
      'node_modules/slick-carousel/slick/slick.css',
      'node_modules/magnific-popup/dist/magnific-popup.css',
      'node_modules/rateyo/min/jquery.rateyo.min.css',
      'node_modules/ion-rangeslider/css/ion.rangeSlider.css'


    ])
    .pipe(concat('lib.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('app/css'))
});


gulp.task('html', function() {
  return gulp.src('app/*.html')
    .pipe(browserSync.reload({ stream: true }))

});

gulp.task('js', function() {
  return gulp.src('app/js/*.js')
    .pipe(browserSync.reload({ stream: true }))

});

gulp.task('watch', function() {
  gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'))
  gulp.watch('app/*.html', gulp.parallel('html'))
  gulp.watch('app/js/*.js', gulp.parallel('js'))

});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  });
});

gulp.task('default', gulp.parallel('sass', 'watch', 'browser-sync', 'script', 'style'))