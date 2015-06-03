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
      stylus    : 'src/stylus/**/*.stylus',
      coreStylus: 'src/stylus/core.stylus',
      base      : [
        'src/txt/license.txt',
        'src/stylus/_configuration.stylus',
        'src/stylus/core.stylus'
      ],
      coffee    : 'src/coffee/**/*.coffee',
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
