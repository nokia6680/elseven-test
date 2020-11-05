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

if (priceOpener) {
    priceOpener.addEventListener('click', function () {
        priceOverlay.classList.toggle('active');
        priceOpener.classList.toggle('active');
        return false;
    });
};

$(function() {
    var quantityBlock = $('.cards__input-quantity');
    var quantityInput = quantityBlock.find('input');

    quantityBlock.on('click', function (evt) {
        evt.preventDefault();
        if (evt.target.classList.contains('plus')) {
            quantityInput.val(parseFloat(quantityInput.val()) + 1);
        }
        if (evt.target.classList.contains('minus') && parseFloat(quantityInput.val()) !== 1) {
            quantityInput.val(parseFloat(quantityInput.val()) - 1);
        }
    });
});

$(function () {
    $('.table div:not(.body-head, .body-title, .aside-empty-title, .body-main-title, .table-title, .table-main-title, .table-body, .body-photo, .body-photo-block)').on('mouseenter mouseleave', function (evt) {
        if (evt.target.classList.contains('body-content') && !$(this).hasClass('body-block')) {
            var bodyIndex = $(this).index() + 1;
            $(this).parents('.body-block').toggleClass('hover');
            $('.body-block').children(".body-content:nth-of-type(" + bodyIndex  + ")").toggleClass("hover-col");
        }
        if (evt.currentTarget.classList.contains('body-block')) {
            var titleIndex = $(this).index();
            $('.table-aside').children(".title-block:nth-of-type(" + titleIndex  + ")").toggleClass("hover");
        }
    });
});
