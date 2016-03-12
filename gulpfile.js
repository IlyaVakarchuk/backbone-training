var gulp = require('gulp'),
  gulpInstall = require('gulp-install'),
  gulpBowerFiles = require('main-bower-files'),
  gulpFilter = require('gulp-filter'),
  gulpUglify = require('gulp-uglify'),
  gulpRename = require('gulp-rename'),
  gulpMinCss = require('gulp-minify-css');

gulp.task('dependencies-install', function() {
  gulp.src('./bower.json')
    .pipe(gulpInstall());
});

gulp.task('bower-files', function() {
  var jsFilter = gulpFilter('**/*.js', {restore : true}),
    cssFilter = gulpFilter('**/*.css', {restore : true});

  return gulp.src(gulpBowerFiles())
    .pipe(jsFilter)
    .pipe(gulpUglify())
    .pipe(gulpRename({
      suffix : ".min"
    }))
    .pipe(gulp.dest('./assets/vendors/js'))
    .pipe(jsFilter.restore)

    .pipe(cssFilter)
    .pipe(gulpMinCss())
    .pipe(gulpRename({
      suffix : ".min"
    }))
    .pipe(gulp.dest('./assets/vendors/css'))
    .pipe(cssFilter.restore);
});