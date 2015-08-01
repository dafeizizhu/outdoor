$(function () {
  var zIndexNumber = 10000
  $('div').each(function () {
    $(this).css('zIndex', zIndexNumber);
    zIndexNumber -= 10
  })
})
