$(function () {
  var $filters = $('.jq-filter')

  $filters.on('click', '.jq-option', function (evt) {
    var $target = $(this)
    $target.addClass('selected').siblings().removeClass('selected')
  })
})
