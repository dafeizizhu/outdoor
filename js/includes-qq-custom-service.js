$(function () {
  var $panel = $('.jq-qq-custom-service')
  var $arrow = $('.jq-qq-custom-service-arrow')
  var $box = $('.jq-qq-custom-service-box')

  var boxWidth = $box.outerWidth()
  
  $arrow.on('click', function (evt) {
    evt.preventDefault()

    if($arrow.hasClass('left')) {
      $arrow.removeClass('left').addClass('right')
      $panel.stop(true, true).animate({
        right: '0px'
      }, 200)
    } else if ($arrow.hasClass('right')) {
      $arrow.removeClass('right').addClass('left')
      $panel.stop(true, true).animate({
        right: '-170px'
      }, 200)
    }
  })
})
