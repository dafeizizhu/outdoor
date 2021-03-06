$(function () {
  var data = []

  $.each($('.ui-slide__panel'), function (index, panel) {
    data.push({})
  })

  new roundSlide('roundSlide980', {
    autoWidth: true,
    width: 1508,
    height: 450
  }, data)
})

$(function () {
  var $classificationItems = $('.jq-classification-item')
  var $classificationItemDetails = $('.jq-classification-item-detail')

  $classificationItems.on('mouseenter', function (evt) {
    var target = this;

    $(target).siblings($classificationItems).removeClass('selected')
    $(target).siblings($classificationItems).find('.jq-classification-item-detail').css('display', 'none')
    $(target).toggleClass('selected')

    var $classificationItemDetail = $(target).find('.jq-classification-item-detail')
    if ($classificationItemDetail.is(':visible')) {
      $classificationItemDetail.css('display', 'none')
    } else {
      $classificationItemDetail.css('display', 'block')
    }
  }).on('mouseleave', function (evt) {
    var target = this
    
    $(target).find('.jq-classification-item-detail').css('display', 'none')
    $(target).toggleClass('selected')
  })

  $classificationItemDetails.on('click', function (evt) {
    evt.stopPropagation()
  })
})

$(function () {
  var $recommendRoutes = $('.jq-recommend-route')
  var $recommendContents = $('.jq-recommend-content')
  var $recommendContentsList = $('.jq-recommend-content-list')

  $recommendRoutes.on('mouseenter', function (evt) {
    var $target = $(this)
    $recommendRoutes.removeClass('selected')
    $target.addClass('selected')

    $.each($recommendRoutes, function (recommendRouteIndex, recommendRoute) {
      if ($recommendRoutes[recommendRouteIndex] == $target[0]) {
        var top = 0
        $.each($recommendContents, function (recommendContentIndex, recommendContent) {
          if (recommendContentIndex < recommendRouteIndex) {
            top += $(recommendContent).height()
          }
        })
        $recommendContentsList.stop()
        $recommendContentsList.animate({
          top: -top + 'px'
        }, 500, 'linear')
      }
    })
  })
})

$(function () {
  var $catalogTabs = $('.jq-catalog-tab')
  
  $catalogTabs.on('mouseenter', function (evt) {
    var target = this
    var $target = $(target)
    var $catalog = $target.parents('.jq-catalog')
    var $tabs = $catalog.find('.jq-catalog-tab')

    $target.addClass('selected').siblings($catalogTabs).removeClass('selected')

    var index = 0
    $.each($tabs, function (i, catalogTab) {
      if (catalogTab == target) {
        index = i
      }
    })

    $target.parents('.jq-catalog').find('.jq-catalog-content').eq(index).show().siblings('.jq-catalog-content').hide()
  })

  $.each($catalogTabs, function (i, catalogTab) {
    $(catalogTab).parents('.jq-catalog').find('.jq-catalog-content').eq(0).show().siblings('.jq-catalog-content').hide()
  })
})

$(function () {
  $('.jq-catalog-content-item').on('mouseenter', function (evt) {
    $(this).find('.jq-catalog-content-item-mask').show()
  }).on('mouseleave', function (evt) {
    $(this).find('.jq-catalog-content-item-mask').hide()
  })
})
