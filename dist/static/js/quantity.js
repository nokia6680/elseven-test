"use strict";

$(function () {
  (function quantityProducts() {
    var $quantityArrowMinus = $(".minus");
    var $quantityArrowPlus = $(".plus");
    var $quantityNum = $(".cart-1__item-input");
    $quantityArrowMinus.click(quantityMinus);
    $quantityArrowPlus.click(quantityPlus);

    function quantityMinus() {
      if ($quantityNum.val() > 1) {
        $quantityNum.val(+$quantityNum.val() - 1);
      }
    }

    function quantityPlus() {
      $quantityNum.val(+$quantityNum.val() + 1);
    }
  })();
});