$(function () {
  var $galleryList = $('.jq-gallery-list')
  var $galleryListItems = $('.jq-gallery-list-item')
  var $galleryTabs = $('.jq-gallery-tabs-item')

  var current = 0

  function select(index) {
    current = index % $galleryListItems.length

    $galleryListItems.eq(index).css('left', '0px')
    
    var prevLeft = 0
    for (var i = index - 1; i >= 0; i--) {
      prevLeft += $galleryListItems.eq(i).width()
      $galleryListItems.eq(i).css('left', -prevLeft + 'px')
    }

    var nextLeft = 0
    for (var j = index + 1; j < $galleryListItems.length; j++) {
      nextLeft += $galleryListItems.eq(j - 1).width()
      $galleryListItems.eq(j).css('left', nextLeft + 'px')
    }

    if (index == 0) {
      $galleryListItems.last().css('left', -($galleryListItems.last().width()) + 'px')
    } else if (index == $galleryListItems.length - 1) {
      $galleryListItems.first().css('left', $galleryListItems.eq(index).width() + 'px')
    }
  }

  $galleryTabs.on('mouseenter', function (evt) {
    var target = this;
    $.each($galleryTabs, function (galleryTabIndex, galleryTab) {
      if ($galleryTabs[galleryTabIndex] == target) {
        var step = (galleryTabIndex - current) < 0 ? (galleryTabIndex - current + $galleryTabs.length) : (galleryTabIndex - current)
        var completeCount = 0

        var move = function () {
          if (step > 0) {
            $galleryListItems.animate({
              left: '-=1000'
            }, 1000, function () {
              completeCount = completeCount + 1
              if (completeCount == $galleryListItems.length) {
                select(current + 1)
                step = step - 1
                if (step > 0) {
                  move()
                }
              }
            })
          }
        }

        move()
      }
    })
    $galleryTabs.removeClass('selected')
    $(target).addClass('selected')
  })
  
  select(0)
})

$(function () {
  var $classificationItems = $('.jq-classification-item')
  var $classificationItemDetails = $('.jq-classification-item-detail')

  $classificationItems.on('click', function (evt) {
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
        $recommendContentsList.animate({
          top: -top + 'px'
        }, 1000)
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
