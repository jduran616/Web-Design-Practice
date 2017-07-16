"use strict";var source = "";

$('.card-img img').click(function() {
  source = $(this).attr('src');
  $('.mod-img').attr('src', source);
  $('.modal').css('display', "block");
  $('body').addClass('m-open');
});

$('.cls-btn').on('click', function() {
  $('.modal').css('display', 'none');
  $('body').removeClass('m-open');source = "";
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
