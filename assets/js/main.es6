/*
*
*	How to import jquery using ES6 syntax?
*	http://stackoverflow.com/a/34340392
*	
**/

// import jQuery
let jQuery = require('jquery');
let $ = jQuery.$;
window.$ = $;
window.jQuery = jQuery;



// import scrollex
let scrollex = require('./jquery.scrollex.min.js');
window.scrollex = scrollex;



// import scrolly
let scrolly = require('./jquery.scrolly.min.js');
window.scrolly = scrolly;



// import skel
let skel = require('./skel.min.js');
window.skel = skel;



// import util scripts
require('./util.js');



// import theme scripts
require('./theme.scripts.js');




