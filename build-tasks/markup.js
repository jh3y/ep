var gulp      = require('gulp'),
  gConfig     = require('../gulp-config'),
  utils       = require('./utils'),
  opts        = gConfig.pluginOpts,
  env         = utils.getEnv(),
  src         = gConfig.paths.sources,
  dest        = gConfig.paths.destinations,
  plugins     = require('gulp-load-plugins')(opts.load),
  /* markup:lint */
  lint = function() {
    return gulp.src(src.markup)
      .pipe(plugins.pugLint());
  },
  /* markup:compile */
  compile = function() {
    opts.pug.pretty = (env.deploy) ? false : true;
    var name = opts.pug.data.name;
    opts.pug.data.name = (env.deploy) ? name + '.min' : name;
    return gulp.src(src.docs)
      .pipe(plugins.plumber())
      .pipe(plugins.pug(opts.pug))
      .pipe(gulp.dest(dest.html));
  },
  /* markup:watch */
  watch = function() {
    gulp.watch(src.markup, ['markup:compile']);
  };

module.exports = {
  lint   : lint,
  compile: compile,
  watch  : watch
};
