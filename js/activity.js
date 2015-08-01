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

$(function () {
  var current = 0
  var $tabs = $('.jq-gallery-tab')
  var $list = $('.jq-gallery-main-list')
  var $items = $('.jq-gallery-main-list-item')
  var $prev = $('.jq-gallery-prev')
  var $next = $('.jq-gallery-next')

  function select(index) {
    if (index < 0 || index > $tabs.length - 1) return
    
    current = index
    $tabs.eq(index).addClass('selected').siblings().removeClass('selected')
    
    var left = 0
    $.each($items, function (i, item) {
      if (i < index) {
        left += $(item).outerWidth()
      }
    })

    $list.animate({
      left: -left + 'px'
    }, 1000)
  }

  $tabs.on('click', function (evt) {
    var target = this
    $.each($tabs, function (i, tab) {
      if (tab == target) {
        select(i)
        return false
      }
    })
  })

  $prev.on('click', function (evt) {
    select(current - 1)
  })

  $next.on('click', function (evt) {
    select(current + 1)
  })
})
