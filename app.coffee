axis         = require 'axis'
rupture      = require 'rupture'
autoprefixer = require 'autoprefixer-stylus'
css_pipeline = require 'css-pipeline'
browserify   = require 'roots-browserify'
babelify     = require 'babelify'


module.exports =
  ignores: [
    'README.md', 
    'ROADMAP.md', 
    'LICENSE', 
    'bower*', 
    'bower_components/**', 
    'views/includes/**', 
    '**/layout.*', 
    '**/_*', 
    '.gitignore', 
    'ship.*conf',
    '**/*.jpg_orig.jpg',
    '.DS_Store'
  ]

  extensions: [
    css_pipeline(files: 'assets/css/*.styl')
    browserify
      files: 'assets/js/main.js'
      sourceMap: true
      transform: babelify
      out: 'js/main.js'
  ]


  jade:
    pretty: true
