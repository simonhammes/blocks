import $ from 'jquery'

$(function() {

   $('.accordion-item-title').on('click', function() {
      $(this).siblings('.accordion-item-content').slideToggle();
   });


});