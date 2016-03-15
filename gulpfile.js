var gulp = require('gulp'),
  gulpInstall = require('gulp-install'),
  gulpBowerFiles = require('main-bower-files'),
  gulpFilter = require('gulp-filter'),
  gulpUglify = require('gulp-uglify'),
  gulpRename = require('gulp-rename'),
  gulpMinCss = require('gulp-minify-css'),
  gulpSass = require('gulp-sass'),
  async = require('async');

gulp.task('dependencies-install', function() {
  gulp.src('./bower.json')
    .pipe(gulpInstall());
});

gulp.task('bower-files', function() {

  var jsFilter = gulpFilter('*.js');
  var cssFilter = gulpFilter('*.css');

  return gulp.src(gulpBowerFiles())
    .pipe(jsFilter)
    .pipe(gulp.dest(config.paths.src.vendors + '/js/'))
    .pipe(gulpUglify())
    .pipe(gulpRename({
      suffix: ".min"
    }))
    .pipe(gulp.dest(config.paths.src.vendors + '/js/'))
    .pipe(jsFilter.restore())

    .pipe(cssFilter)
    .pipe(gulp.dest(config.paths.src.vendors + '/css'))
    .pipe(gulpMinCss())
    .pipe(gulpRename({
      suffix: ".min"
    }))
    .pipe(gulp.dest(config.paths.src.vendors + '/css'))
    .pipe(cssFilter.restore())
});

gulp.task('sass', function () {
  return gulp.src(config.paths.src.style)
    .pipe(gulpSass().on('error', gulpSass.logError))
    .pipe(gulpMinCss())
    .pipe(gulpRename({
      suffix : ".min"
    }))
    .pipe(gulp.dest(config.paths.build.style));
});

gulp.task('sass:watch', function () {
  gulp.watch(config.paths.src.style, ['sass']);
});

gulp.task('client-build', function(){
  gulp.src(['src/app/**/*'])
    .pipe(gulpUglify())
    .pipe(gulp.dest('app'))
});


gulp.task('default', function(){
  var tasks = ['dependencies-install', 'bower-files', 'client-build', 'sass'];

  var sync = tasks.map(function(task) {
    return function(callback) {
      gulp.run(task, function(err) {
        callback(err);
      });
    };
  });
  async.series(sync);
});