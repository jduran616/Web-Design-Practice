/*
 * Filename:    handler.js
 * Description: Lab 14 Dynamic FAQ Handler
 * Author:      Jaime Duran
 */
"use strict";

$('#show').click(function(){
  $('p').toggleClass('hide');
  if ($(this).text() == "Show All") {
    $(this).text('Hide All');
  } else {
    $(this).text('Show All');
  }
});

$('#main').on('click', 'h2', function() {
    $(this).next().toggleClass('hide');
});

$('form').submit(function(e){
  e.preventDefault();
  var $quo = $('#question').val();
  var $ans = $('#answer').val();
  $('#main').append("<h2>" + $quo + "</h2>");
  $('#main').append('<p class=\"offset-by-two columns hide\">' + $ans + "</p>");
});
