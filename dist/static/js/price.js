"use strict";

var $range = $(".js-range-slider"),
    $inputFrom = $(".js-input-from"),
    $inputTo = $(".js-input-to"),
    $infoFrom = $(".from"),
    $infoTo = $(".to"),
    $openedInfo = $(".data"),
    instance,
    min = 100,
    max = 350,
    from = 0,
    to = 0;
$range.ionRangeSlider({
  skin: "round",
  type: "double",
  min: min,
  max: max,
  from: 100,
  to: 350,
  onStart: updateInputs,
  onChange: updateInputs
});
instance = $range.data("ionRangeSlider");

function updateInputs(data) {
  from = data.from;
  to = data.to;
  $inputFrom.prop("value", from);
  $inputTo.prop("value", to);
  $infoFrom.prop("value", from);
  $infoTo.prop("value", to);
}

$inputFrom.on("input", function () {
  var val = $(this).prop("value"); // validate

  if (val < min) {
    val = min;
  } else if (val > to) {
    val = to;
  }

  instance.update({
    from: val
  });
});
$inputTo.on("input", function () {
  var val = $(this).prop("value"); // validate

  if (val < from) {
    val = from;
  } else if (val > max) {
    val = max;
  }

  instance.update({
    to: val
  });
});