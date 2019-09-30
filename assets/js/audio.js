import $ from "jquery";
import Plyr from 'plyr';

// 2. Audio Player
// ----------------

$( document ).ready(function() {

const controls = `
<div class="plyr__controls grid-x align-justify">
    <div class="shrink cell">

    <a href="#header"><svg class="icon icon-logo"><use xlink:href="/assets/icons/symbol-defs.svg#icon-logo"></use></svg></a>

    </div>


    <div class="shrink cell">

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
const player = new Plyr('#player', {
  controls
});

const getRelativePlayerSource = () => {
  return "/" + player.source.split("/").slice(3).join("/")
}

player.on("play", function () {
  $("[data-src]").removeClass("playing audio-active");
  $("[data-src='" + getRelativePlayerSource() + "']").addClass("playing  audio-active");
})

player.on("pause", function () {
  $("[data-src]").removeClass("playing");
})


function playSrc (url, $source, loadOnly) {

  const sameSource = getRelativePlayerSource() === url
  if (sameSource && player.playing) {
    return player.pause()
  }

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

  
  if (loadOnly) {
    $source.addClass("audio-active");
    return;
  }
  player.play();
}


// Next button 
$(".home").on("click", ".plyr__control.next-audio-item", function () {
  var $allSources = $("[data-src]")
  var activeIndex = $allSources.index($(".audio-active[data-src]"))
  var $next = $allSources.eq((activeIndex + 1) % $allSources.length)
  $next.click()
})

// Previus

$(".home").on("click", ".plyr__control.prev-audio-item", function () {
  var $allSources = $("[data-src]")
  var activeIndex = $allSources.index($(".audio-active[data-src]"))
  var $prev = $allSources.eq(activeIndex - 1)
  $prev.click()
})

playSrc($("[data-src]:first").data("src"), $("[data-src]:first"), true)

$(".home").on("click", "[data-src]", function (e) {
var $this = $(this)
  var src = $this.data("src")
  playSrc(src, $this)

   e.preventDefault()
   return false;
})

});