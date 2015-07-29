$(function () {
  var $pager = $('div.pager')

  var pagerWidth = 0
  
  $.each($pager.children(), function (index, child) {
    pagerWidth += $(child).outerWidth() + parseInt($(child).css('margin-right'), 10)
  })

  $pager.css({
    position: 'relative',
    left: (($pager.parent().outerWidth() - pagerWidth) / 2) + 'px'
  })
})
