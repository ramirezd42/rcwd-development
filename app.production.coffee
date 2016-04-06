axis         = require 'axis'
rupture      = require 'rupture'
autoprefixer = require 'autoprefixer-stylus'
js_pipeline  = require 'js-pipeline'
css_pipeline = require 'css-pipeline'

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
    'ship.*conf'
  ]

  extensions: [
    js_pipeline(files: 'assets/js/*.coffee', out: 'js/app.js', minify: true, hash: true),
    css_pipeline(files: 'assets/css/*.styl', out: 'css/style.css', minify: true, hash: true)
  ]

  stylus:
    use: [axis(), rupture(), autoprefixer()]
