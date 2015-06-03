var gulp       = require('gulp'),
  browserSync  = require('browser-sync'),
  gConfig      = require('./gulp-config'),
  config       = require('./config'),
  pluginOpts   = gConfig.plugin_options,
  sources      = gConfig.paths.sources,
  destinations = gConfig.paths.destinations,
  plugins      = require('gulp-load-plugins')(pluginOpts.load),
  isStat       = (plugins.gUtil.env.stat)   ? true: false,
  isDist       = (plugins.gUtil.env.dist)   ? true: false,
  processSrc   = [],
  gatherSrc    = function (sources, ext) {
      for (var source in sources ) {
        if (sources[source] === true) {
          processSrc.push('src/' + ext + "/features/" + source + '.' + ext);
        }
      }
  };

gulp.task('serve', ['build:complete'], function() {
  browserSync(pluginOpts.browserSync);
  gulp.watch(sources.overwatch).on('change', browserSync.reload);
});

gulp.task('jade:compile', function(event) {
  return gulp.src(sources.jade)
    .pipe(plugins.jade(pluginOpts.jade))
    .pipe(gulp.dest(destinations.html));
});
gulp.task('jade:watch', function(event) {
  gulp.watch(sources.jade, ['jade:compile']);
});

gulp.task('coffee:compile', function(event) {
  return gulp.src(sources.coffee)
    .pipe(plugins.coffee())
    .pipe(gulp.dest(isDist ? destinations.dist: destinations.js))
    .pipe(plugins.uglify())
    .pipe(plugins.rename(pluginOpts.rename))
    .pipe(isStat ? plugins.size(pluginOpts.gSize): plugins.gUtil.noop())
    .pipe(gulp.dest(isDist ? destinations.dist: destinations.js));
});
gulp.task('coffee:watch', function(event) {
  gulp.watch(sources.coffee, ['coffee:compile']);
});

gulp.task('stylus:compile', function(e) {
  processSrc = sources.base;
  gatherSrc(config.features, 'stylus');
  return gulp.src(processSrc)
    .pipe(plugins.plumber())
    .pipe(plugins.concat(gConfig.pkg.name + '.stylus'))
    .pipe(plugins.stylus())
    .pipe(plugins.prefix(pluginOpts.prefix))
    .pipe(gulp.dest(isDist ? destinations.dist: destinations.css))
    .pipe(plugins.minify())
    .pipe(plugins.rename(pluginOpts.rename))
    .pipe(isStat ? plugins.size(pluginOpts.gSize): plugins.gUtil.noop())
    .pipe(gulp.dest(isDist ? destinations.dist: destinations.css));
});
gulp.task('stylus:watch', function() {
  gulp.watch(sources.stylus, ['stylus:compile']);
});

gulp.task('build:complete', [
  'coffee:compile',
  'jade:compile',
  'stylus:compile'
]);

gulp.task('dev', [
  'serve',
  'coffee:watch',
  'stylus:watch',
  'jade:watch'
]);

gulp.task('default', ['dev']);
