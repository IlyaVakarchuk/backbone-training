var gulp = require('gulp'),
  gulpInstall = require('gulp-install'),
  gulpBowerFiles = require('main-bower-files'),
  gulpFilter = require('gulp-filter'),
  gulpUglify = require('gulp-uglify'),
  gulpRename = require('gulp-rename'),
  gulpMinCss = require('gulp-minify-css'),
  gulpSass = require('gulp-sass');

gulp.task('dependencies-install', function() {
  gulp.src('./bower.json')
    .pipe(gulpInstall());
});

gulp.task('bower-files', function() {

  var jsFilter = gulpFilter('*.js');
  var cssFilter = gulpFilter('*.css');

  return gulp.src(gulpBowerFiles())

    // grab vendor js files from bower_components, minify and push in /public
    .pipe(jsFilter)
    .pipe(gulp.dest('./assets/vendors' + '/js/'))
    .pipe(gulpUglify())
    .pipe(gulpRename({
      suffix: ".min"
    }))
    .pipe(gulp.dest('./assets/vendors' + '/js/'))
    .pipe(jsFilter.restore())

    // grab vendor css files from bower_components, minify and push in /public
    .pipe(cssFilter)
    .pipe(gulp.dest('./assets/vendors' + '/css'))
    .pipe(gulpMinCss())
    .pipe(gulpRename({
      suffix: ".min"
    }))
    .pipe(gulp.dest('./assets/vendors' + '/css'))
    .pipe(cssFilter.restore())
});

gulp.task('sass', function () {
  return gulp.src('./src/style/**/*.scss')
    .pipe(gulpSass().on('error', gulpSass.logError))
    .pipe(gulpMinCss())
    .pipe(gulpRename({
      suffix : ".min"
    }))
    .pipe(gulp.dest('./assets/css/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/style/**/*.scss', ['sass']);
});