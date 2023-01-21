/* global $ */

$(document).ready(function(){
  // $('resume').hide();
  setTimeout(function(){
    $('#loader').fadeOut(1000, function(){
      $('resume').show();
      $('footer').show();
      console.log('in timeout script');
    });
    
  }, 2000);
});

console.log('loader.js file');