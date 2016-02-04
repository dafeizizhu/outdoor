$(function () {
  var $tabs = $('.jq-head-slide-tab')
  var $contents = $('.jq-head-slide-content')

  $tabs.on('mouseenter', function () {
    var index = $tabs.index(this)
    $contents.eq(index).show().siblings().hide()
  })
})
