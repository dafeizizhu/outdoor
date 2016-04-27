$(function () {
  var $tabs = $('.jq-gallery-tab')
  var $items = $('.jq-gallery-item')
  var $prev = $('.jq-gallery-prev')
  var $next = $('.jq-gallery-next')

  var current

  function select(index) {
    if (index < 0) {
      index = $tabs.length - 1
    }
    if (index > $tabs.length - 1) {
      index = 0
    }
    
    current = index
    
    $items.each(function (i) {
      if (i == current) {
        $(this).show()
      } else {
        $(this).hide()
      }
    })

    var tabPage = Math.floor(index / 4)
    $tabs.each(function (i) {
      if (Math.floor(i / 4) == tabPage) {
        $(this).show()
      } else {
        $(this).hide()
      }
    })
  }
  
  $tabs.on('click', function (evt) {
    select($.inArray(this, $tabs))
  })

  $prev.on('click', function (evt) {
    select(current - 1)
  })

  $next.on('click', function (evt) {
    select(current + 1)
  })
})
