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

window.onload = function() {
    let table = document.querySelector('.table');
    if (table) {
        let bodyBlockElements = Array.from(document.querySelectorAll('.body-block'));
        let headText = Array.from(document.querySelectorAll('.body-head'));
        let tableAsideText = Array.from(document.querySelectorAll('.table-aside'));
        let popupButtons = Array.from(document.querySelectorAll('.body-content button'));
        let currentElement = null;
        let parentElement = null;
        let indexColElement = null;
        let indexRowElement = null;

        table.addEventListener("mouseover", function (evt) {
            if (currentElement) {
                return;
            }

            let target = evt.target.closest('.body-content');

            if (!target) {
                return;
            }

            currentElement = target;
            parentElement = currentElement.parentNode;

            parentElement.classList.add('hover');

            let childCol = Array.from(parentElement.childNodes);

            childCol.forEach((item, index) => {
                if (item === currentElement) {
                    indexColElement = index;
                }
            });

            bodyBlockElements.forEach((item, index) => {
                if (item === parentElement) {
                    indexRowElement = index + 1;
                }
            });

            bodyBlockElements.forEach((item) => {
                item.childNodes.forEach((item, index) => {
                    if (index === indexColElement) {
                        item.classList.add('hover-col');
                    }
                });
            });
        });

        popupButtons.forEach((item) => {
            item.addEventListener("click", function (evt) {
                evt.preventDefault();
                let price = evt.target.closest('.body-content').innerText.split('\n')[0];
                console.log(price);
                headText.forEach((item) => {
                    item.childNodes.forEach((item, index) => {
                        if (index === indexColElement) {
                            let headText = item.innerText.split('\n');
                            let headTitleText = headText[0];
                            let headDescriptionText = headText[1];
                            console.log(headTitleText, headDescriptionText);
                        }
                    });
                });
                tableAsideText.forEach((item) => {
                    item.childNodes.forEach((item, index) => {
                        if (index === indexRowElement) {
                            let asideText = item.innerText.split('\n');
                            let asideHeadText = asideText[0];
                            let asideDescriptionText = asideText[1];
                            console.log(asideHeadText, asideDescriptionText);
                        }
                    });
                });
            })
        });

        table.addEventListener("mouseout", function (evt) {
            if (!currentElement) {
                return;
            }

            let relatedTarget = evt.relatedTarget;

            while (relatedTarget) {
                if (relatedTarget === currentElement) {
                    return;
                }
                relatedTarget = relatedTarget.parentNode;
            }

            if (parentElement.classList.contains('hover')) {
                parentElement.classList.remove('hover')
            }

            bodyBlockElements.forEach((item) => {
                item.childNodes.forEach((item, index) => {
                    if (index === indexColElement) {
                        item.classList.remove('hover-col');
                    }
                });
            });

            currentElement = null;
            parentElement = null;
            indexColElement = null;
            indexRowElement = null;
        });
    }
}

