$(function () {
  var $galleryList = $('.jq-gallery-list')
  var $galleryListItems = $('.jq-gallery-list-item')
  var $galleryTabs = $('.jq-gallery-tabs-item')

  var current = 0

  function show(index, prev) {
    $galleryListItems.eq(index).css('left', '0px')

    var prevLeft = 0
    var prevIndex = index
    var prevCount = prev
    while(prevCount) {
      prevIndex = prevIndex - 1 < 0 ? prevIndex - 1 + $galleryListItems.length : prevIndex - 1
      prevLeft += $galleryListItems.eq(prevIndex).width()
      $galleryListItems.eq(prevIndex).css('left', -prevLeft + 'px')
      prevCount--
    }

    var nextCount = $galleryListItems.length - prev - 1;

    var nextLeft = 0
    var nextIndex = index
    while(nextCount) {
      nextLeft += $galleryListItems.eq(nextIndex).width()
      nextIndex = (nextIndex + 1) % $galleryListItems.length
      $galleryListItems.eq(nextIndex).css('left', nextLeft + 'px')
      nextCount--
    }
  }

  $galleryTabs.on('mouseenter', function (evt) {
    var target = this;
    $galleryList.stop(true, true)
    $.each($galleryTabs, function (galleryTabIndex, galleryTab) {
      if ($galleryTabs[galleryTabIndex] == target) {
        var step = galleryTabIndex > current ? galleryTabIndex - current : current - galleryTabIndex
        var direction = galleryTabIndex > current ? 1 : -1
        var prevCount = galleryTabIndex > current ? 1 : 2

        show(current, prevCount)

        var move = function () {
          if (current != galleryTabIndex) {
            $galleryList.animate({
              left: -(direction * 1000) + 'px'
            }, 500 / step, 'linear', function () {
              $galleryList.css('left', '0px')
              current = current + direction < 0 ? (current + direction + $galleryTabs.length) : ((current + direction) % $galleryTabs.length)
              show(current, prevCount)
              move()
            })
          }
        }
        move()
      }
    })
    $galleryTabs.removeClass('selected')
    $(target).addClass('selected')
  })
  
  show(0, 1)
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
  
  $catalogTabs.on('click', function (evt) {
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
