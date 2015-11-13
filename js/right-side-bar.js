$(function() {
  var $rightSideBar = $('.jq-right-side-bar')

  if ($rightSideBar.length > 0) {
    $(window).on('resize', window_resizeHandler)
    window_resizeHandler()
  }

  function window_resizeHandler(evt) {
    $rightSideBar.css('top', ($(window).height() - $rightSideBar.height()) / 2 + 'px')
  }
})
