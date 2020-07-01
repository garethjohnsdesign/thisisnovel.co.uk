// 1. Imports
// ----------

import $ from "jquery";
import Foundation from 'foundation-sites';
import AOS from 'aos';
import PanelSnap from 'panelsnap';
import Swiper from 'swiper';


// 1. Special Queries
// ------------------

Foundation.Interchange.SPECIAL_QUERIES[ "medium-retina" ] = 'only screen and (min-width: 40em), (min-width: 40em) and (-webkit-min-device-pixel-ratio: 2), (min-width: 40em) and (min--moz-device-pixel-ratio: 2), (min-width: 40em) and (-o-min-device-pixel-ratio: 2/1), (min-width: 40em) and (min-device-pixel-ratio: 2), (min-width: 40em) and (min-resolution: 192dpi), (min-width: 40em) and (min-resolution: 2dppx)';
Foundation.Interchange.SPECIAL_QUERIES[ "large-retina" ] = 'only screen and (min-width: 64em), (min-width: 64em) and (-webkit-min-device-pixel-ratio: 2), (min-width: 64em) and (min--moz-device-pixel-ratio: 2), (min-width: 64em) and (-o-min-device-pixel-ratio: 2/1), (min-width: 64em) and (min-device-pixel-ratio: 2), (min-width: 64em) and (min-resolution: 192dpi), (min-width: 64em) and (min-resolution: 2dppx)';
Foundation.Interchange.SPECIAL_QUERIES[ "xlarge-retina" ] = 'only screen and (min-width: 75em), (min-width: 75em) and (-webkit-min-device-pixel-ratio: 2), (min-width: 75em) and (min--moz-device-pixel-ratio: 2), (min-width: 75em) and (-o-min-device-pixel-ratio: 2/1), (min-width: 75em) and (min-device-pixel-ratio: 2), (min-width: 75em) and (min-resolution: 192dpi), (min-width: 75em) and (min-resolution: 2dppx)';
Foundation.Interchange.SPECIAL_QUERIES[ "xxlarge-retina" ] = 'only screen and (min-width: 90em), (min-width: 75em) and (-webkit-min-device-pixel-ratio: 2), (min-width: 75em) and (min--moz-device-pixel-ratio: 2), (min-width: 75em) and (-o-min-device-pixel-ratio: 2/1), (min-width: 75em) and (min-device-pixel-ratio: 2), (min-width: 75em) and (min-resolution: 192dpi), (min-width: 75em) and (min-resolution: 2dppx)';

// 1. Foundation
// -------------

$( document ).foundation();


$( document ).ready(function() {

// 1. Loader
// ---------------

if ($("body").hasClass("home")) {
  $( ".loader" ).removeClass( "hide" );
  $( ".loader" ).addClass( "loading" );
  setTimeout( function() {
  $( ".loader" ).addClass( "loaded" );
  }, 3000
  );
}


// 8. Animate on Scroll
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


// 2. Smooth Scroll
// ----------------

// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          }
        });
      }
    }
  });


// 2. Snapping
// ----------------


var defaultOptions = {
    container: document.body,
    panelSelector: '.snapping',
    directionThreshold: 25,
    delay: 0,
    duration: 300,
    easing: function(t) { return t }
  };

new PanelSnap(defaultOptions);

});

// 5. Swiper
// -----------

//initialize swiper when document ready
var mySwiper = new Swiper ('.swiper-container', {

direction: 'horizontal',
slidesPerView: '1.2',
centeredSlides: true,
loop: true,
spaceBetween: 4,
preventClicks: true,
slideToClickedSlide: false,

keyboard: {
enabled: true,
onlyInViewport: false
},

breakpoints: {
  640: {
    slidesPerView: 1.2,
    spaceBetween: 4,
  },
  1200: {
    slidesPerView: 2,
    spaceBetween: 4,
  },
  1440: {
    slidesPerView: 2.8,
    spaceBetween: 4,
  }
},

navigation: {
nextEl: '.swiper-button-next',
prevEl: '.swiper-button-prev'
}


});
