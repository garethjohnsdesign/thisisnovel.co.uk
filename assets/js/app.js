// 1. Imports
// ----------

import $ from "jquery";
import Foundation from 'foundation-sites';
import AOS from 'aos';
import Plyr from 'plyr';
import PanelSnap from 'panelsnap';


// 1. Special Queries
// ------------------

Foundation.Interchange.SPECIAL_QUERIES[ "medium-retina" ] = 'only screen and (min-width: 40em), (min-width: 40em) and (-webkit-min-device-pixel-ratio: 2), (min-width: 40em) and (min--moz-device-pixel-ratio: 2), (min-width: 40em) and (-o-min-device-pixel-ratio: 2/1), (min-width: 40em) and (min-device-pixel-ratio: 2), (min-width: 40em) and (min-resolution: 192dpi), (min-width: 40em) and (min-resolution: 2dppx)';
Foundation.Interchange.SPECIAL_QUERIES[ "large-retina" ] = 'only screen and (min-width: 64em), (min-width: 64em) and (-webkit-min-device-pixel-ratio: 2), (min-width: 64em) and (min--moz-device-pixel-ratio: 2), (min-width: 64em) and (-o-min-device-pixel-ratio: 2/1), (min-width: 64em) and (min-device-pixel-ratio: 2), (min-width: 64em) and (min-resolution: 192dpi), (min-width: 64em) and (min-resolution: 2dppx)';
Foundation.Interchange.SPECIAL_QUERIES[ "xlarge-retina" ] = 'only screen and (min-width: 75em), (min-width: 75em) and (-webkit-min-device-pixel-ratio: 2), (min-width: 75em) and (min--moz-device-pixel-ratio: 2), (min-width: 75em) and (-o-min-device-pixel-ratio: 2/1), (min-width: 75em) and (min-device-pixel-ratio: 2), (min-width: 75em) and (min-resolution: 192dpi), (min-width: 75em) and (min-resolution: 2dppx)';
Foundation.Interchange.SPECIAL_QUERIES[ "xxlarge-retina" ] = 'only screen and (min-width: 90em), (min-width: 75em) and (-webkit-min-device-pixel-ratio: 2), (min-width: 75em) and (min--moz-device-pixel-ratio: 2), (min-width: 75em) and (-o-min-device-pixel-ratio: 2/1), (min-width: 75em) and (min-device-pixel-ratio: 2), (min-width: 75em) and (min-resolution: 192dpi), (min-width: 75em) and (min-resolution: 2dppx)';

// 1. Foundation
// -------------

$( document ).foundation();



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
// 1. Scroll Hide Navigation
// ---------------

var prev = 0;
var $window = $(window);
var nav = $('.scrollhide-nav');

$window.off('scroll');
$window.on('scroll', function() {
    var scrollTop = $window.scrollTop();
    if (scrollTop < 0) scrollTop = 0;
    nav.toggleClass('hidden', scrollTop > prev);
    prev = scrollTop;
});


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
          };
        });
      }
    }
  });

// 2. Audio Player
// ----------------

const controls = `
<div class="plyr__controls">
    <div class="plyr__control show-for-medium">
      {title}
    </div>
    <button type="button" class="plyr__control next-audio-item show-for-medium">
        <svg class="icon icon-arrow_forward_ios"><use xlink:href="/assets/icons/symbol-defs.svg#icon-arrow_forward_ios"></use></svg>
    </button>
    <button type="button" class="plyr__control prev-audio-item show-for-medium">
        <svg class="icon icon-arrow_back_ios"><use xlink:href="/assets/icons/symbol-defs.svg#icon-arrow_back_ios"></use></svg>
    </button>
    <button type="button" class="plyr__control play-audio-item" aria-label="Play, {title}" data-plyr="play">
        <svg class="icon--pressed icon icon-pause"><use xlink:href="/assets/icons/symbol-defs.svg#icon-pause"></use></svg>
        <svg class="icon--not-pressed icon icon-play_arrow"><use xlink:href="/assets/icons/symbol-defs.svg#icon-play_arrow"></use></svg>
    </button>
    </div>
</div>
`;

// Setup the player
const player = window.pl = new Plyr('#player', {
  controls
});

function playSrc (url, $source) {
  player.source = {
      type: 'audio',
      title: $source.data("audio-title") || '',
      sources: [
        {
            src: url,
            type: ~url.indexOf(".ogg") ? "audio/ogg" : "audio/mp3"
        }
      ]
  };
  $("[data-src]").removeClass("playing");
  $source.addClass("playing");
  player.play();
}


$(".home").on("click", ".plyr__control.next-audio-item", function () {
  var $allSources = $("[data-src")
  var activeIndex = $allSources.index($(".secondary[data-src]"))
  var $next = $allSources.eq((activeIndex + 1) % $allSources.length)
  $next.click()
})


$(".home").on("click", ".plyr__control.prev-audio-item", function () {
  var $allSources = $("[data-src")
  var activeIndex = $allSources.index($(".secondary[data-src]"))
  var $prev = $allSources.eq(activeIndex - 1)
  $prev.click()
})

// $("[data-src]:first").addClass("secondary");

$(".home").on("click", "[data-src]", function (e) {
var $this = $(this)
  var src = $this.data("src")
  playSrc(src, $this)

   e.preventDefault()
   return false;
})


// 2. Snapping
// ----------------

var defaultOptions = {
    container: document.body,
    panelSelector: '.snapping',
    directionThreshold: 50,
    delay: 0,
    duration: 300,
    easing: function(t) { return t },
  };

new PanelSnap(defaultOptions);




/*
$( ".play-button" ).click(function() {
  $( this ).toggleClass( "playing" );
  var icon = 'icon-play-button';
  icon += ( ! $(this).hasClass('playing') ) ? '-hover' : '';

//   $('svg', this).attr('class', icon);
  $('svg use', this ).attr('xlink:href', '/assets/icons/symbol-defs.svg#' + icon);
});
*/

$(".play-button")
  .on("mouseenter", function() {
    $(this).find("use").attr("xlink:href", "/assets/icons/symbol-defs.svg#icon-play-button-hover");
  })
  .on("mouseleave", function() {
    $(this).find("use").attr("xlink:href", "/assets/icons/symbol-defs.svg#icon-play-button");
  });

$(".play-button").on("click", function () {
    if ($(this).parent().hasClass("playing")) {
        console.log("test");
        $(this).parent().removeClass("playing");
    } else {
        $(this).parent().addClass("playing");
    }

});

$(".link-button-large")
  .on("mouseenter", function() {
    $(this).find("use").attr("xlink:href", "/assets/icons/symbol-defs.svg#icon-link-button-large-hover");
  })
  .on("mouseleave", function() {
    $(this).find("use").attr("xlink:href", "/assets/icons/symbol-defs.svg#icon-link-button-large");
  });

$(".play-button-large")
  .on("mouseenter", function() {
    $(this).find("use").attr("xlink:href", "/assets/icons/symbol-defs.svg#icon-play-button-large-hover");
  })
  .on("mouseleave", function() {
    $(this).find("use").attr("xlink:href", "/assets/icons/symbol-defs.svg#icon-play-button-large");
  });



/*
$(".play-button")
  .on("click", function() {
    $(this).find("use").attr("xlink:href", "/assets/icons/symbol-defs.svg#icon-play-button-hover");
  })
  .on("mouseleave", function() {
    $(this).find("use").attr("xlink:href", "/assets/icons/symbol-defs.svg#icon-play-button");
  });
*/


/*
$('.play-button').click(function(event) {
   event.preventDefault();
   $(this).find("use").attr("xlink:href", "/assets/icons/symbol-defs.svg#icon-pause-button").toggle();
   $(this).find("use").attr("xlink:href", "/assets/icons/symbol-defs.svg#icon-play-button").toggle();
});
*/

$(".link-button")
  .on("mouseenter", function() {
    $(this).find("use").attr("xlink:href", "/assets/icons/symbol-defs.svg#icon-link-button-hover");
  })
  .on("mouseleave", function() {
    $(this).find("use").attr("xlink:href", "/assets/icons/symbol-defs.svg#icon-link-button");
  });