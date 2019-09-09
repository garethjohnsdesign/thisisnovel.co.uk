// 1. Imports
// ----------

import $ from "jquery";
import Foundation from 'foundation-sites';
import AOS from 'aos';
import Swup from 'swup';
import SwupBodyClassPlugin from "@swup/body-class-plugin";
import Plyr from 'plyr';

// 1. Special Queries
// ------------------

Foundation.Interchange.SPECIAL_QUERIES[ "medium-retina" ] = 'only screen and (min-width: 40em), (min-width: 40em) and (-webkit-min-device-pixel-ratio: 2), (min-width: 40em) and (min--moz-device-pixel-ratio: 2), (min-width: 40em) and (-o-min-device-pixel-ratio: 2/1), (min-width: 40em) and (min-device-pixel-ratio: 2), (min-width: 40em) and (min-resolution: 192dpi), (min-width: 40em) and (min-resolution: 2dppx)';
Foundation.Interchange.SPECIAL_QUERIES[ "large-retina" ] = 'only screen and (min-width: 64em), (min-width: 64em) and (-webkit-min-device-pixel-ratio: 2), (min-width: 64em) and (min--moz-device-pixel-ratio: 2), (min-width: 64em) and (-o-min-device-pixel-ratio: 2/1), (min-width: 64em) and (min-device-pixel-ratio: 2), (min-width: 64em) and (min-resolution: 192dpi), (min-width: 64em) and (min-resolution: 2dppx)';
Foundation.Interchange.SPECIAL_QUERIES[ "xlarge-retina" ] = 'only screen and (min-width: 75em), (min-width: 75em) and (-webkit-min-device-pixel-ratio: 2), (min-width: 75em) and (min--moz-device-pixel-ratio: 2), (min-width: 75em) and (-o-min-device-pixel-ratio: 2/1), (min-width: 75em) and (min-device-pixel-ratio: 2), (min-width: 75em) and (min-resolution: 192dpi), (min-width: 75em) and (min-resolution: 2dppx)';
Foundation.Interchange.SPECIAL_QUERIES[ "xxlarge-retina" ] = 'only screen and (min-width: 90em), (min-width: 75em) and (-webkit-min-device-pixel-ratio: 2), (min-width: 75em) and (min--moz-device-pixel-ratio: 2), (min-width: 75em) and (-o-min-device-pixel-ratio: 2/1), (min-width: 75em) and (min-device-pixel-ratio: 2), (min-width: 75em) and (min-resolution: 192dpi), (min-width: 75em) and (min-resolution: 2dppx)';

// 1. Foundation
// -------------

$( document ).foundation();


// 2. Smooth Scroll
// ----------------

/*
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
*/

const player = new Plyr('#player');


/*
const plyr = new Plyr(document.querySelector('.plyr'));

var radio = document.querySelector('.plyr').plyr;

var player = document.querySelector('.playlist');
var songs = player.querySelectorAll('.playlist--list li');
var i;
var active = null;

for(i = 0; i < songs.length; i++) {
	songs[i].onclick = changeChannel;
}

setSource( getId(songs[0]), buildSource(songs[0]) );

document.querySelector('.plyr').addEventListener('ended', nextSong);

function changeChannel(e) {
	setSource( getId(e.target), buildSource(e.target), true );
}

function getId(el) {
	return Number(el.getAttribute('data-id'));
}

function buildSource(el) {
	var obj = [{
		src: el.getAttribute('data-audio'),
		type: 'audio/ogg'
	}];

	return obj;
}

function setSource(selected, sourceAudio, play) {
	if(active !== selected) {
		active = selected;
		radio.source({
			type: 'audio',
			title: 'test',
			sources: sourceAudio
		});

		for(var i = 0; i < songs.length; i++) {
			if(Number(songs[i].getAttribute('data-id')) === selected) {
				songs[i].className = 'active';
			} else {
				songs[i].className = '';
			}
		}

		if(play) {
			radio.play();
		}
	} else {
		radio.togglePlay();
	}
}

function nextSong(e) {
	var next = active + 1;

	if(next < songs.length) {
		setSource( getId(songs[next]), buildSource(songs[next]), true );
	}
}
*/