//$(function () {
//  var $tabs = $('.jq-tab')
//  var $details = $('.jq-detail')
//
//  $tabs.on('click', function (evt) {
//    var index
//    var targetTab = this
//
//    $.each($tabs, function (i, tab) {
//      if (tab == targetTab) {
//        index = i
//      }
//    })
//
//    $(this).addClass('selected').siblings().removeClass('selected')
//    $details.eq(index).show().siblings().hide()
//  })
//
//  $details.eq(0).siblings().hide()
//})

$(function () {
  var current = 0
  var $tabs = $('.jq-gallery-tab')
  var $list = $('.jq-gallery-main-list')
  var $items = $('.jq-gallery-main-list-item')
  var $prev = $('.jq-gallery-prev')
  var $next = $('.jq-gallery-next')
  var $wrapper = $('.jq-gallery-tab-wrapper')
  var $thumbList = $('.jq-gallery-tab-list')

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

    $list.stop()
    $list.animate({
      left: -left + 'px'
    }, 500, 'linear')

    var left = -(Math.floor(index / 4) * $wrapper.width())
    $thumbList.css('left', (left ? (left - 10) : 0) + 'px')
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

$(function () {
  var $tabsWrapper = $('.jq-tabs')

  $tabsWrapper.sticky({
    topSpacing: 0
  })
})

$(function () {
  var $jqDetails = $('.jq-detail')
  var $jqTabs = $('.jq-tab')

  $jqDetails.each(function (index) {
    var position = $(this).position()

    $(this).scrollspy({
      min: position.top - 50,
      max: position.top + $(this).height() - 50,
      onEnter: function (element, position) {
        $jqTabs.eq(index).addClass('selected').siblings().removeClass('selected')
      }
    })
  })

  $jqTabs.each(function (index) {
    $(this).on('click', function (evt) {
      evt.preventDefault()

      $(this).addClass('selected').siblings().removeClass('selected')
      var scrollTop = $jqDetails.eq(index).offset().top
      $('html, body').scrollTop(scrollTop - 50)
    })
  })
})
