"use strict";
var source = "";

var nav = $('nav').outerHeight();
var $scroll = $('nav').outerHeight() + $('header').outerHeight() - 10;

$(window).scroll(function () {
  var wScroll = $(this).scrollTop();
  if($(this).scrollTop() > $scroll) {
    $('body').addClass('fixed-nav');
    $('body').css('padding-top', nav*1.5+'px');
  } else if ($(this).scrollTop() <= $scroll){
    $('body').removeClass('fixed-nav');
    $('body').css('padding-top', '0');
  }

  if(wScroll > $('.posts').offset().top - ($(window).height()/1.2)) {

    $('.posts .post').each(function(i) {
      setTimeout(function() {
        $('.posts .post').eq(i).addClass("is-showing");
      }, 150 * (i+1));
    });
  }

  if(wScroll > $('#skills ul').offset().top - ($(window).height()/1.2)) {

    $('#skills .skill-set').each(function(i) {
      setTimeout(function() {
        $('#skills .skill-set').addClass("is-drop");
      }, 150);
    });
  }
});

$('.posts img').click(function() {
  source = $(this).attr('src');
  console.log(source);
  if (source === './img/new-site-sm.PNG') {
    source = './img/new-site.PNG'
  } else if (source === './img/foobt-sm.PNG') {
    source = './img/foobt-lg.PNG'
  } else if (source === './img/this.PNG') {
    source = './img/this-lg.PNG'
  }

  $('.mod-img').attr('src', source);
  $('.modal').css('display', "block");
  $('body').addClass('m-open');
});

$('.cls-btn').on('click', function() {
  $('.modal').css('display', 'none');
  $('body').removeClass('m-open');
  source = "";
});

function valEm() {
  var text = document.forms["sub-cont"]["Email"].value;

  var atpos = text.indexOf('@');
  var dotpos = text.indexOf('.');

  if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 > text.length) {
    alert('Please enter a valid email address.');
    return false;
  }
}
