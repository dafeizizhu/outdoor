$(function () {
  var $tabs = $('.jq-tab')
  var $contents = $('.jq-content')

  function select(index) {
    $tabs.eq(index).addClass('selected').siblings($tabs).removeClass('selected')
    $contents.eq(index).show().siblings($contents).hide()
  }

  $tabs.on('click', function (evt) {
    var target = this
    $.each($tabs, function (index, tab) {
      if (target == tab) {
        select(index)
      }
    })
  })

  select(0)
})
