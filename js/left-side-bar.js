$(function () {
  var $leftSideBar = $('.jq-left-side-bar')
  var $leftSideBarBannerClose = $('.jq-left-side-bar-banner-close')

  if ($leftSideBar.length > 0) {
    $(window).on('resize', window_resizeHandler)
    window_resizeHandler()
  }

  function window_resizeHandler(evt) {
    $leftSideBar.css('top', ($(window).height() - $leftSideBar.height()) / 2 + 'px')
  }

  $leftSideBarBannerClose.on('click', function (evt) {
    $leftSideBar.hide()
  })
})
