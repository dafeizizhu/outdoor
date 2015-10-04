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
