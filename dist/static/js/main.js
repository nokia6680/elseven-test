"use strict";

$(function () {
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
  elem.addEventListener("click", function () {
    this.classList.toggle("active");
  });
}

;
var upperItem = document.getElementsByClassName('aside__link');
var elNodes = document.querySelectorAll(".aside__link");
var listChange = document.querySelector('.category__content');

for (var i = 0; i < upperItem.length; i++) {
  var elem = upperItem[i];
  elem.addEventListener("click", function () {
    this.classList.toggle("active");
    listChange.classList.toggle('good-selected');
  });
}

;
var priceOpener = document.querySelector('.filter__price-open');
var priceOverlay = document.querySelector('.filter__price-body');

if (priceOpener) {
  priceOpener.addEventListener('click', function () {
    priceOverlay.classList.toggle('active');
    priceOpener.classList.toggle('active');
    return false;
  });
}

;
var quantityBlocks = document.querySelectorAll('.cards__input-quantity');

if (quantityBlocks) {
  Array.from(quantityBlocks).forEach(function (block) {
    var quantityInput = block.querySelector('input');
    block.addEventListener('click', function (evt) {
      evt.preventDefault();

      if (evt.target.classList.contains('plus')) {
        quantityInput.value = parseFloat(quantityInput.value) + 1;
        var event = new CustomEvent('change', {
          bubbles: true,
          detail: {
            value: quantityInput.value
          }
        });
        quantityInput.dispatchEvent(event);
      }

      if (evt.target.classList.contains('minus') && parseFloat(quantityInput.value) !== 1) {
        quantityInput.value = parseFloat(quantityInput.value) - 1;

        var _event = new CustomEvent('change', {
          bubbles: true,
          detail: {
            value: quantityInput.value
          }
        });

        quantityInput.dispatchEvent(_event);
      }
    });
  });
} // Изменение цены в корзине


var cartItems = Array.from(document.querySelectorAll('.cart-1__item'));

if (cartItems.length > 0) {
  var fullSum = document.querySelector('.cart-1__checkout-overall');
  var allSum = document.querySelectorAll('.cart-1__item-sum');
  fullSum.textContent = "".concat(Array.from(allSum).reduce(function (sum, current) {
    return sum + parseInt(current.textContent);
  }, 0), " \u20BD");
  cartItems.forEach(function (item) {
    var productRemove = item.querySelector('.cart-1__item-remove');
    productRemove.addEventListener('click', function (evt) {
      evt.preventDefault();
      item.remove();
    });
    item.addEventListener('change', function (evt) {
      var price = item.querySelector('.cart-1__item-price');
      var sum = item.querySelector('.cart-1__item-sum');

      if (!evt.target.value) {
        sum.textContent = "".concat(evt.detail.value * parseInt(price.textContent), " \u20BD");
      } else {
        sum.textContent = "".concat(evt.target.value * parseInt(price.textContent), " \u20BD");
      }

      fullSum.textContent = "".concat(Array.from(allSum).reduce(function (sum, current) {
        return sum + parseInt(current.textContent);
      }, 0), " \u20BD");
    });
  });
}

; // Модальная требуха

function modalOpen(data) {
  var ESC_BUTTON = 27;
  var modal = document.querySelector('.cards-modal');

  if (modal) {
    var onDocumentKeyDown = function onDocumentKeyDown(evt) {
      if (evt.keyCode === ESC_BUTTON && modal.classList.contains("cards-modal--show")) {
        evt.preventDefault();
        modalClose(evt);
      }
    };

    var onModalCloseButton = function onModalCloseButton(evt) {
      modalClose(evt);
    };

    var onOverlayClick = function onOverlayClick(evt) {
      if (evt.target.classList.contains('overlay')) {
        modalClose(evt);
      }
    };

    var modalClose = function modalClose(evt) {
      evt.preventDefault();
      modal.classList.remove("cards-modal--show");
      overlay.classList.remove("overlay--show");
      modalCloseButton.removeEventListener("click", onModalCloseButton);
      body.classList.remove("no-scroll");
      window.removeEventListener("keydown", onDocumentKeyDown);
    };

    var _modalOpen = function _modalOpen(data) {
      data.asideTitle ? modalTitleDescr.innerHTML = "<span>".concat(data.asideTitle, ": </span>").concat(data.productTitle) : modalTitleDescr.textContent = "".concat(data.productTitle);
      ;
      modalTitleDescrInput.value = data.productTitle;

      if (data.asideDimensions && data.productDimensions) {
        modalDimensions.textContent = "".concat(data.asideDimensions, ": ").concat(data.productDimensions);
        modalDimensionsInput.value = data.productDimensions;
      } else {
        modalDimensions.classList.add('visually-hidden');
      }

      if (!data.tableMini) {
        modalDescriptionFirst.textContent = "".concat(data.bodyTitle ? data.bodyTitle : '', ": ").concat(data.description[0], " ");
        modalDescriptionSecond.textContent = data.description[1];
        modalDescriptionInput.value = data.description.join(' ');
      }

      modalPrice.textContent = data.price;
      modalPriceInput.value = data.price;
      modalSubmitButton.dataset.variationId = data.buttonId;
      modal.classList.add("cards-modal--show");
      overlay.classList.add("overlay--show");
      body.classList.add("no-scroll");
      modalCloseButton.addEventListener("click", onModalCloseButton);
      overlay.addEventListener("click", onOverlayClick);
      window.addEventListener("keydown", onDocumentKeyDown);
    };

    var modalCloseButton = modal.querySelector('.modal-form__close-button');
    var modalTitleDescr = modal.querySelector('.cards-modal__title-descr');
    var modalTitleDescrInput = modal.querySelector('input[name=title]');
    var modalDimensions = modal.querySelector('.cards-modal__dimensions');
    var modalDimensionsInput = modal.querySelector('input[name=dimensions]');
    var modalDescriptionFirst = modal.querySelector('.cards-modal__description .first');
    var modalDescriptionSecond = modal.querySelector('.cards-modal__description .second');
    var modalDescriptionInput = modal.querySelector('input[name=description]');
    var modalPrice = modal.querySelector('.cards-modal__price');
    var modalPriceInput = modal.querySelector('input[name=price]');
    var modalSubmitButton = modal.querySelector('.cards-modal__form button');
    var overlay = document.querySelector('.overlay');
    var body = document.querySelector('body');

    _modalOpen(data);
  }
}

window.onload = function () {
  var table = document.querySelector('.table');

  if (table) {
    var bodyBlockElements = Array.from(document.querySelectorAll('.body-block'));
    var headText = Array.from(document.querySelectorAll('.body-head'));
    var tableAsideText = Array.from(document.querySelectorAll('.title-block'));
    var popupButtons = Array.from(document.querySelectorAll('.body-content button'));
    var asideDimensions = table.querySelector('.title-dimensions');
    var data = {
      tableMini: false
    };
    var currentElement = null;
    var parentElement = null;
    var indexColElement = null;
    var indexRowElement = null;

    if (table.classList.contains('table-mini')) {
      data.tableMini = true;
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

      var target = evt.target.closest('.body-content');

      if (!target) {
        return;
      }

      currentElement = target;
      parentElement = currentElement.parentNode;
      parentElement.classList.add('hover');
      var childCol = Array.from(parentElement.childNodes);
      childCol.forEach(function (item, index) {
        if (item === currentElement) {
          indexColElement = index;
        }
      });
      bodyBlockElements.forEach(function (item, index) {
        if (item === parentElement) {
          indexRowElement = index;
        }
      });
      bodyBlockElements.forEach(function (item) {
        item.childNodes.forEach(function (item, index) {
          if (index === indexColElement) {
            item.classList.add('hover-col');
          }
        });
      });
      tableAsideText.forEach(function (item, index) {
        if (index === indexRowElement) {
          item.classList.add('hover');
        }
      });
    });
    popupButtons.forEach(function (item) {
      item.addEventListener("click", function (evt) {
        evt.preventDefault();
        data.buttonId = item.dataset.variationId;
        data.price = evt.target.closest('.body-content').innerText.split('\n')[0];
        headText.forEach(function (item) {
          item.childNodes.forEach(function (item, index) {
            if (index === indexColElement) {
              data.description = item.innerText.split('\n');
            }
          });
        });
        tableAsideText.forEach(function (item, index) {
          if (index === indexRowElement) {
            var asideText = item.innerText.split('\n');
            data.productTitle = asideText[0];
            data.productDimensions = asideText[1];
          }
        });
        modalOpen(data);
      });
    });
    table.addEventListener("mouseout", function (evt) {
      if (!currentElement) {
        return;
      }

      var relatedTarget = evt.relatedTarget;

      while (relatedTarget) {
        if (relatedTarget === currentElement) {
          return;
        }

        relatedTarget = relatedTarget.parentNode;
      }

      if (parentElement.classList.contains('hover')) {
        parentElement.classList.remove('hover');
      }

      bodyBlockElements.forEach(function (item) {
        item.childNodes.forEach(function (item, index) {
          if (index === indexColElement) {
            item.classList.remove('hover-col');
          }
        });
      });
      tableAsideText.forEach(function (item, index) {
        if (index === indexRowElement) {
          item.classList.remove('hover');
        }
      });
      currentElement = null;
      parentElement = null;
      indexColElement = null;
      indexRowElement = null;
    });
  }
}; // Увеличение  картинок


$(document).ready(function () {
  $(".title-img, .cards__img").click(function () {
    var img = $(this);
    var src = img.attr('src');
    $("body").append("<div class='popup-image'>" + "<div class='popup-image__bg'></div>" + "<div class='popup-image__wrapper'><img class='popup-image__pic' src=" + src + "><button class='popup-image__close-button' type='button'><span class='visually-hidden'>Закрыть окно</span></button></div>" + "</div>");
    $(".popup-image").fadeIn(800);
    $(".popup-image__bg, .popup-image__close-button").click(function () {
      $(".popup-image").fadeOut(800);
      setTimeout(function () {
        $(".popup-image").remove();
      }, 800);
    });
    $(document).keydown(function (evt) {
      if (evt.keyCode == 27) {
        $(".popup-image").fadeOut(800);
        setTimeout(function () {
          $(".popup-image").remove();
        }, 800);
      }
    });
  });
});