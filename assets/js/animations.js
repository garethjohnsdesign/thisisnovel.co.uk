var logo = document.getElementById('logo');
var logoItem = bodymovin.loadAnimation({
  wrapper: logo,
  animType: 'svg',
  loop: false,
  autoplay: false,
  path: 'logo.json'
});

setTimeout(function(){ logoItem.play(); }, 1500);

var circles = document.getElementById('circles');
var circlesItem = bodymovin.loadAnimation({
  wrapper: circles,
  animType: 'svg',
  loop: false,
  autoplay: false,
  path: 'circles.json'
});

setTimeout(function(){ circlesItem.play(); }, 4000);