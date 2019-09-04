// 1. Imports
// ----------

import $ from "jquery";
import Foundation from 'foundation-sites';
import AOS from 'aos';
import Swup from 'swup';
import "lightGallery";
import "lg-fullscreen";
import "lg-video";
import SwupBodyClassPlugin from "@swup/body-class-plugin";
import tippy from 'tippy.js';


$( document ).ready( function() {
  function init() {

// 1. Special Queries
// ------------------

Foundation.Interchange.SPECIAL_QUERIES[ "medium-retina" ] = 'only screen and (min-width: 40em), (min-width: 40em) and (-webkit-min-device-pixel-ratio: 2), (min-width: 40em) and (min--moz-device-pixel-ratio: 2), (min-width: 40em) and (-o-min-device-pixel-ratio: 2/1), (min-width: 40em) and (min-device-pixel-ratio: 2), (min-width: 40em) and (min-resolution: 192dpi), (min-width: 40em) and (min-resolution: 2dppx)';
Foundation.Interchange.SPECIAL_QUERIES[ "large-retina" ] = 'only screen and (min-width: 64em), (min-width: 64em) and (-webkit-min-device-pixel-ratio: 2), (min-width: 64em) and (min--moz-device-pixel-ratio: 2), (min-width: 64em) and (-o-min-device-pixel-ratio: 2/1), (min-width: 64em) and (min-device-pixel-ratio: 2), (min-width: 64em) and (min-resolution: 192dpi), (min-width: 64em) and (min-resolution: 2dppx)';
Foundation.Interchange.SPECIAL_QUERIES[ "xlarge-retina" ] = 'only screen and (min-width: 75em), (min-width: 75em) and (-webkit-min-device-pixel-ratio: 2), (min-width: 75em) and (min--moz-device-pixel-ratio: 2), (min-width: 75em) and (-o-min-device-pixel-ratio: 2/1), (min-width: 75em) and (min-device-pixel-ratio: 2), (min-width: 75em) and (min-resolution: 192dpi), (min-width: 75em) and (min-resolution: 2dppx)';
Foundation.Interchange.SPECIAL_QUERIES[ "xxlarge-retina" ] = 'only screen and (min-width: 90em), (min-width: 75em) and (-webkit-min-device-pixel-ratio: 2), (min-width: 75em) and (min--moz-device-pixel-ratio: 2), (min-width: 75em) and (-o-min-device-pixel-ratio: 2/1), (min-width: 75em) and (min-device-pixel-ratio: 2), (min-width: 75em) and (min-resolution: 192dpi), (min-width: 75em) and (min-resolution: 2dppx)';

// 1. Foundation
// -------------

$( document ).foundation();

// 1. Lightgallery
// ---------------


$(".gallery--video" ).lightGallery( {
  selector: '.item',
  counter: false,
  autoplayFirstVideo: true,
  autoplayVideoOnSlide: true,
  videoMaxWidth: '1080px',
  youtubePlayerParams: {
    modestbranding: 1,
    showinfo: 0,
    rel: 0,
    autoplay: 0
  },
  vimeoPlayerParams: {
    title: 0,
    byline: 0,
    portrait: 0,
    color: 'FFFFFF'
  }
});


$('.gallery--images').lightGallery({
    selector: '.item',
    download: false,
    counter: false
});

$('.gallery--home').lightGallery({
    selector: '.item--home',
    download: false,
    counter: false
});




// 1. Text on Mouse Over
// ---------------

tippy('[data-tippy-content]', {
  placement: 'bottom',
  followCursor: true,
  theme: 'custom',
  flip: false
})

/*
$(function (selector = '[data-message]', horizontalOffset = 0, verticalOffset = 50) {
;

    Array.from(document.querySelectorAll(selector)).forEach(function (item) {
        // Every time the pointer moves over the element the
        // CSS-rule in overwritten with new values for
        // top and left.
        item.addEventListener('mousemove', function (e) {
            let countCssRules = document.styleSheets[0].cssRules.length;
            let newRule = selector +
                ':hover:after { display: block; ' +
                'left: ' + (e.offsetX + horizontalOffset) + 'px; ' +
                'top: ' + (e.offsetY + verticalOffset) + 'px; }';

            document.styleSheets[0].insertRule(newRule, countCssRules);
        });
    });
}('.tooltip-item', 10));
*/


// 1. Loader
// ---------------

if ($("body").hasClass("home")) {
  $( ".loader" ).removeClass( "hide" );
  $( ".loader" ).addClass( "loading" );
  setTimeout( function() {
  $( ".loader" ).addClass( "loaded" );
  }, 2500 
  );
}

// 2. Animate on Scroll
// --------------------
$(function() {
  AOS.init({ 
   offset: 64,
   easing: 'ease-in-out-quart', 
   duration: 600
   });   
});

$(function() {
window.addEventListener('load', AOS.refresh);
});
   
// 2. Hover Effect
// ---------------
if ($("body").hasClass("home")) {
{Foundation.reInit($('[data-equalizer]'));}
}

}


// 2. Page Transitions
// -------------------
const options = {
  animationSelector: '[class*="swup-transition-"]',
  containers: [ '#swup-body', '#swup-header' ],
  plugins: [ new SwupBodyClassPlugin() ]
};
const swup = new Swup( options );

// 2. Run Once
// -----------
init();

swup.on( 'contentReplaced', init );

} );