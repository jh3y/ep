var gulp  = require('gulp'),
  gutil   = require('gulp-util'),
  server  = require('./build-tasks/server'),
  scripts = require('./build-tasks/scripts'),
  styles  = require('./build-tasks/styles'),
  markup  = require('./build-tasks/markup'),
  deploy  = require('./build-tasks/deploy');

/*
  serve; creates local static livereload server using browser-sync.
*/
gulp.task('serve', ['compile'], server.start);

/*
  scripts:compile/scripts:watch

  watch for changes to scriptsScript files then compile app JavaScript file
  from source, concatenating and uglifying content and publishing output based on env flag. For example, if we want sourcemaps we can output our individual JS files and the sourcemap for them to the desired directory by using the --map flag.
*/
gulp.task('scripts:lint', scripts.lint);
gulp.task('scripts:compile', ['scripts:lint'], scripts.compile);
gulp.task('scripts:watch', scripts.watch);

/*
  styles:compile/styles:watch

  watch for changes to styles files then compile stylesheet from source
  auto prefixing content and generating output based on env flag.
*/
gulp.task('styles:lint', styles.lint);
gulp.task('styles:compile', ['styles:lint'], styles.compile);
gulp.task('styles:watch', styles.watch);

/*
  markup:compile/markup:watch

  watch for all markup file changes then compile
  page document files.
*/
gulp.task('markup:lint', markup.lint);
gulp.task('markup:compile', markup.compile);
gulp.task('markup:watch', markup.watch);

gulp.task('deploy', ['compile'], deploy.run);

gulp.task('compile', [
  'markup:compile',
  'styles:compile',
  'scripts:compile'
]);

gulp.task('watch', [
  'markup:watch',
  'styles:watch',
  'scripts:watch'
]);

var defaultTasks = ((gutil.env.deploy) ? true: false) ? [
  'deploy'
]:[
  'serve',
  'watch'
];

gulp.task('default', defaultTasks);
