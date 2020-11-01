$(function() {
    $('.selectric').selectric({
        disableOnMobile: false,
        nativeOnMobile: false
    });

    $('.selectric-2').selectric({
        disableOnMobile: false,
        nativeOnMobile: false
    });
});


var upperLvl = document.getElementsByClassName('aside__item');
var elNodes = document.querySelectorAll(".aside__item");

for (var i = 0; i < upperLvl.length; i++) {
    var elem = upperLvl[i];

    elem.addEventListener("click", function() {
        this.classList.toggle("active");
    });
};

var upperItem = document.getElementsByClassName('aside__link');
var elNodes = document.querySelectorAll(".aside__link");
var listChange = document.querySelector('.category__content');

for (var i = 0; i < upperItem.length; i++) {
    var elem = upperItem[i];

    elem.addEventListener("click", function() {
        this.classList.toggle("active");
        listChange.classList.toggle('good-selected');
    });
};

var priceOpener = document.querySelector('.filter__price-open');
var priceOverlay = document.querySelector('.filter__price-body');

priceOpener.addEventListener('click', function () {
  priceOverlay.classList.toggle('active');
  priceOpener.classList.toggle('active');
  return false;
});
