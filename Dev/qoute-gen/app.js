"use strict";

$(window).keypress(function(e){
  if (e.which === 32) {
   $('#quote').addClass('text-blur-out').removeClass('text-focus-in');
   $('#author').addClass('text-blur-out').removeClass('text-focus-in');
   $('#bot').removeClass('flicker-1');
   setTimeout(function(){
     $.ajax({
       crossOrigin: true,
       url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=mycallback",
       dataType: "jsonp"
     });
   }, 1000);
  }
});

function mycallback(json) {
  $('#quote').html(json[0].content).addClass('text-focus-in').removeClass('text-blur-out');
  $('#author').html("- " + json[0].title).addClass('text-focus-in').removeClass('text-blur-out');
}
