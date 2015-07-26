$(function () {
  var $galleryList = $('.jq-gallery-list')
  var $galleryListItems = $('.jq-gallery-list-item')
  var $galleryTabs = $('.jq-gallery-tabs-item')

  $galleryTabs.on('click', function (evt) {
    var target = this;
    $.each($galleryTabs, function (galleryTabIndex, galleryTab) {
      if ($galleryTabs[galleryTabIndex] == target) {
        var left = 0;
        $.each($galleryListItems, function (galleryListItemIndex, galleryListItem) {
          if (galleryListItemIndex < galleryTabIndex) {
            left += $(galleryListItem).width()
          }
        })
        $galleryList.animate({
          'left': -left + 'px'
        }, 1000)
      }
    })
    $galleryTabs.removeClass('selected')
    $(target).addClass('selected')
  })
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
})
