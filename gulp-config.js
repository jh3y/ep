var env = 'build/';
module.exports = {
  pkg: {
    name: 'progrecss'
  },
  plugin_options : {
    browserSync  : {
      port   : 1987,
      server : {
        baseDir: './' + env
      }
    },
    jade: {
      pretty: true
    },
    coffee: {
      bare: true
    },
    gSize: {
      showFiles: true
    },
    rename: {
      suffix: '.min'
    },
    prefix: [
      'last 3 versions',
      'Blackberry 10',
      'Android 3',
      'Android 4'
    ],
    load: {
      rename: {
        'gulp-gh-pages'             : 'deploy',
        'gulp-util'                 : 'gUtil',
        'gulp-minify-css'           : 'minify',
        'gulp-autoprefixer'         : 'prefix'
      }
    }
  },
  paths: {
    sources: {
      jade      : 'src/jade/**/*.jade',
      less      : 'src/less/**/*.less',
      scss      : 'src/sass/**/*.scss',
      stylus    : 'src/stylus/**/*.stylus',
      coreLess  : 'src/less/core.less',
      coreStylus: 'src/stylus/core.stylus',
      coreScss  : 'src/scss/core.scss',
      coffee    : 'src/coffee/**/*.coffee',
      license   : 'src/txt/license.txt',
      overwatch : env + '/**/*.*'
    },
    destinations: {
      html     : env,
      js       : env + 'js/',
      css      : env + 'css/',
      dist     : 'dist/'
    }
  }
};
