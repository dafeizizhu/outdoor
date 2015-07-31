$(function () {
  var $tabs = $('.jq-tab')
  var $details = $('.jq-detail')

  $tabs.on('click', function (evt) {
    var index
    var targetTab = this

    $.each($tabs, function (i, tab) {
      if (tab == targetTab) {
        index = i
      }
    })

    $(this).addClass('selected').siblings().removeClass('selected')
    $details.eq(index).show().siblings().hide()
  })

  $details.eq(0).siblings().hide()
})
