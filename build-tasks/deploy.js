var gulp      = require('gulp'),
  gConfig     = require('../gulp-config'),
  src         = gConfig.paths.sources,
  opts        = gConfig.pluginOpts,
  plugins     = require('gulp-load-plugins')(opts.load),
  /* deploy */
  run = function() {
    return gulp.src(src.overwatch)
      .pipe(plugins.deploy());
  };

module.exports = {
  run: run
};
