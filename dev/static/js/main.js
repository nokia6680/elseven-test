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

let quantityBlocks = document.querySelectorAll('.cards__input-quantity');

if (quantityBlocks) {
    Array.from(quantityBlocks).forEach((block) => {
        const quantityInput = block.querySelector('input');
        block.addEventListener('click', function (evt) {
            evt.preventDefault();
            if (evt.target.classList.contains('plus')) {
                quantityInput.value = parseFloat(quantityInput.value) + 1;
                const event = new CustomEvent('onchange', {
                    bubbles: true,
                    detail: { value: quantityInput.value }
                });
                quantityInput.dispatchEvent(event);
            }
            if (evt.target.classList.contains('minus') && parseFloat(quantityInput.value) !== 1) {
                quantityInput.value = parseFloat(quantityInput.value) - 1;
                const event = new CustomEvent('onchange', {
                    bubbles: true,
                    detail: { value: quantityInput.value }
                });
                quantityInput.dispatchEvent(event);
            }
        })
    });
}

// Изменение цены в корзине
let cartItems = document.querySelectorAll('.cart-1__item')

if (cartItems) {
    Array.from(cartItems).forEach((item) => {
        item.addEventListener('onchange', function (evt) {
            console.log(evt.currentTarget);
            console.log(evt.detail.value);
        });
    });
};

// Модальная требуха

function modalOpen(data) {
    const ESC_BUTTON = 27;

    let modal = document.querySelector('.cards-modal');

    if (modal) {

        let modalCloseButton = modal.querySelector('.modal-form__close-button');
        let modalTitle = modal.querySelector('.cards-modal h4');
        let modalTitleInput = modal.querySelector('input[name=title]');
        let modalDimensions = modal.querySelector('.cards-modal__dimensions');
        let modalDimensionsInput = modal.querySelector('input[name=dimensions]');
        let modalDescriptionFirst = modal.querySelector('.cards-modal__description .first');
        let modalDescriptionSecond = modal.querySelector('.cards-modal__description .second');
        let modalDescriptionInput = modal.querySelector('input[name=description]');
        let modalPrice = modal.querySelector('.cards-modal__price');
        let modalPriceInput = modal.querySelector('input[name=price]');
        let overlay = document.querySelector('.overlay');

        function onDocumentKeyDown(evt) {
            if (evt.keyCode === ESC_BUTTON && modal.classList.contains("cards-modal--show")) {
                evt.preventDefault();
                modalClose(evt);
            }
        }

        function onModalCloseButton(evt) {
            modalClose(evt);
        }

        function onOverlayClick(evt) {
            if (evt.target.classList.contains('overlay')) {
                modalClose(evt);
            }
        }

        function modalClose(evt) {
            evt.preventDefault();
            modal.classList.remove("cards-modal--show");
            overlay.classList.remove("overlay--show");
            modalCloseButton.removeEventListener("click", onModalCloseButton);
            window.removeEventListener("keydown", onDocumentKeyDown);
        }

        function modalOpen(data) {
            (data.asideTitle) ? modalTitle.innerHTML = `<span>${data.asideTitle}: </span>${data.productTitle}` : modalTitle.textContent = `${data.productTitle}`;;
            modalTitleInput.value = data.productTitle;
            if (data.asideDimensions && data.productDimensions) {
                modalDimensions.textContent = `${data.asideDimensions}: ${data.productDimensions}` ;
                modalDimensionsInput.value = data.productDimensions;
            } else {
                modalDimensions.classList.add('visually-hidden');
            }

            if (!data.tableMini) {
                modalDescriptionFirst.textContent = `${data.bodyTitle ? data.bodyTitle : ''}: ${data.description[0]} `;
                modalDescriptionSecond.textContent = data.description[1];
                modalDescriptionInput.value = data.description.join(' ');
            }

            modalPrice.textContent = data.price;
            modalPriceInput.value = data.price;
            modal.classList.add("cards-modal--show");
            overlay.classList.add("overlay--show");
            modalCloseButton.addEventListener("click", onModalCloseButton);
            overlay.addEventListener("click", onOverlayClick);
            window.addEventListener("keydown", onDocumentKeyDown);
        }

        modalOpen(data);
    }
}

window.onload = function() {
    let table = document.querySelector('.table');

    if (table) {

        let bodyBlockElements = Array.from(document.querySelectorAll('.body-block'));
        let headText = Array.from(document.querySelectorAll('.body-head'));
        let tableAsideText = Array.from(document.querySelectorAll('.table-aside'));
        let popupButtons = Array.from(document.querySelectorAll('.body-content button'));
        let asideDimensions =  table.querySelector('.title-dimensions');

        let data = {
            tableMini: false
        };

        let indexModifier = 1;
        let currentElement = null;
        let parentElement = null;
        let indexColElement = null;
        let indexRowElement = null;

        if (table.classList.contains('table-mini')) {
            data.tableMini = true;
            indexModifier = 0;
            data.asideTitle = table.querySelector('.aside-empty-title .title-main').textContent;
        } else {
            data.asideTitle = table.querySelector('.title-main').textContent;
        }

        if (asideDimensions) {
            data.asideDimensions = asideDimensions.textContent;
        }

        data.bodyTitle = table.querySelector('.body-main-title').textContent;

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
                    indexRowElement = index + indexModifier;
                }
            });

            bodyBlockElements.forEach((item) => {
                item.childNodes.forEach((item, index) => {
                    if (index === indexColElement) {
                        item.classList.add('hover-col');
                    }
                });
            });

            tableAsideText.forEach((item) => {
                item.childNodes.forEach((item, index) => {
                    if (index === indexRowElement) {
                        item.classList.add('hover');
                    }
                });
            });
        });

        popupButtons.forEach((item) => {
            item.addEventListener("click", function (evt) {
                evt.preventDefault();
                data.price = evt.target.closest('.body-content').innerText.split('\n')[0];
                headText.forEach((item) => {
                    item.childNodes.forEach((item, index) => {
                        if (index === indexColElement) {
                            data.description = item.innerText.split('\n');
                        }
                    });
                });
                tableAsideText.forEach((item) => {
                    item.childNodes.forEach((item, index) => {
                        if (index === indexRowElement) {
                            let asideText = item.innerText.split('\n');
                            data.productTitle = asideText[0];
                            data.productDimensions = asideText[1];
                        }
                    });
                });
                modalOpen(data);
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

            tableAsideText.forEach((item) => {
                item.childNodes.forEach((item, index) => {
                    if (index === indexRowElement) {
                        item.classList.remove('hover');
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

// Увеличение  картинок
$(document).ready(function() {

    $(".title-img, .cards__img").click(function() {
        var img = $(this);
        var src = img.attr('src');
        $("body").append("<div class='popup-image'>"+
            "<div class='popup-image__bg'></div>"+
            "<div class='popup-image__wrapper'><img class='popup-image__pic' src="+src+"><button class='popup-image__close-button' type='button'><span class='visually-hidden'>Закрыть окно</span></button></div>"+
            "</div>");
        $(".popup-image").fadeIn(800);
        $(".popup-image__bg, .popup-image__close-button").click(function() {
            $(".popup-image").fadeOut(800);
            setTimeout(function() {
                $(".popup-image").remove();
            }, 800);
        });
        $(document).keydown(function(evt) {
            if(evt.keyCode == 27){
                $(".popup-image").fadeOut(800);
                setTimeout(function() {
                    $(".popup-image").remove();
                }, 800);
            }
        });
    });

});


