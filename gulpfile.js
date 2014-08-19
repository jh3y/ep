var gulp = require('gulp'),
  pkg = require('./package.json'),
  plumber = require('gulp-plumber'),
  less = require('gulp-less'),
  sass = require('gulp-sass'),
  coffee = require('gulp-coffee'),
  uglify = require('gulp-uglify'),
  jade = require('gulp-jade'),
  watch = require('gulp-watch'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  prefix = require('gulp-autoprefixer'),
  connect = require('gulp-connect'),
  config = require('./progrecss-config.json'),
  processSrc = [],
  sources = {
    jade: 'src/jade/**/*.jade',
    coreLess: 'src/less/core.less',
    coreSass: 'src/scss/core.scss',
    coffee: 'src/coffee/**/*.coffee',
    license: 'src/txt/license.txt'
  },
  env = 'build/',
  destinations = {
    html: env,
    jsBuild: env + 'js/',
    cssBuild: env + 'css/',
    overwatch: env + '/**/*.*'
  },
  gatherSrc = function (sources, ext) {
      for (var source in sources ) {
        if (sources[source] === true) {
          processSrc.push('src/' + ext + "/features/" + source + '.' + ext);
        }
      }
    };






gulp.task('serve', function(event) {
  connect.server({
    root: destinations.html,
    port: 1987,
    livereload: true
  });
  watch({glob: destinations.overwatch})
    .pipe(connect.reload());
});
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
  processSrc = [sources.license, sources.coreLess];
	gatherSrc(config.features, 'less');
  return gulp.src(processSrc)
    .pipe(plumber())
    .pipe(concat(pkg.name + '.less'))
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
  processSrc = [sources.license, sources.coreSass];
  gatherSrc(config.features, 'scss');
  return gulp.src(processSrc)
    .pipe(plumber())
    .pipe(concat(pkg.name + '.scss'))
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
gulp.task('dev', ['serve', 'coffee:watch', 'less:watch', 'jade:watch']);
gulp.task('default', ['dev']);
