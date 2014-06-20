var gulp = require('gulp'),
  less = require('gulp-less'),
  sass = require('gulp-sass'),
  coffee = require('gulp-coffee'),
  uglify = require('gulp-uglify'),
  jade = require('gulp-jade'),
  watch = require('gulp-watch'),
  rename = require('gulp-rename'),
  prefix = require('gulp-autoprefixer'),
  sources = {
    jade: ['src/jade/**/*.jade'],
    less: ['src/less/**/*.less'],
    sass: ['src/scss/**/*.scss'],
    coffee: ['src/coffee/**/*.coffee']
  },
  destinations = {
    html: '',
    jsBuild: 'build/',
    cssBuild: 'build/'
  };
gulp.task('jade:compile', function(event) {
  return gulp.src(sources.jade)
    .pipe(jade())
    .pipe(gulp.dest(destinations.html));
});
gulp.task('jade:watch', function(event) {
  watch({glob: sources.jade}, ['jade:compile']);
});
gulp.task('coffee:compile', function(event) {
  return gulp.src(sources.coffee)
    .pipe(coffee())
    .pipe(gulp.dest(destinations.jsBuild))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(destinations.jsBuild));
});
gulp.task('coffee:watch', function(event) {
  watch({glob: sources.coffee}, ['coffee:compile']);
});
gulp.task('less:compile', function(event) {
  return gulp.src(sources.less)
    .pipe(less())
    .pipe(prefix([
      'last 3 versions',
      'Blackberry 10',
      'Android 3',
      'Android 4'
    ]))
    .pipe(gulp.dest(destinations.cssBuild))
    .pipe(less({
      compress: true
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(destinations.cssBuild));
});
gulp.task('less:watch', function(event) {
  watch({glob: sources.less}, ['less:compile']);
});
gulp.task('sass:compile', function(event) {
  return gulp.src(sources.sass)
    .pipe(sass())
    .pipe(prefix([
      'last 3 versions',
      'Blackberry 10',
      'Android 3',
      'Android 4'
    ]))
    .pipe(gulp.dest(destinations.cssBuild))
    .pipe(sass({
      outputStyle: "compressed"
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(destinations.cssBuild));
});
gulp.task('sass:watch', function(event) {
  watch({glob: sources.scss}, ['sass:compile']);
});
gulp.task('dev', ['coffee:watch', 'less:watch', 'jade:watch']);
gulp.task('default', ['dev']);
