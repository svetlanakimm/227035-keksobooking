'use strict';

window.pin = (function () {
  var tokyoPinMap = 'tokyo__pin-map';
  var pinsMap = document.querySelector('.' + tokyoPinMap);

  var getPin = function (advert) {
    var PIN_CLASS_NAME = 'pin';
    var IMG_CLASS_NAME = 'rounded';
    var IMG_WIDTH = 40;
    var IMG_HEIGHT = 40;

    var pin = document.createElement('div');
    var img = document.createElement('img');

    img.src = advert.author.avatar;
    img.className = IMG_CLASS_NAME;
    img.width = IMG_WIDTH;
    img.height = IMG_HEIGHT;
    img.tabIndex = 0;

    pin.className = PIN_CLASS_NAME;
    pin.style.left = advert.location.x - pin.offsetWidth / 2 + 'px';
    pin.style.top = advert.location.y - pin.offsetHeight + 'px';

    pin.appendChild(img);

    return pin;
  };

  var resetActiveClass = function () {
    var pinsArray = document.getElementsByClassName('pin');
    for (var j = 0; j < pinsArray.length; j++) {
      pinsArray[j].classList.remove('pin--active');
    }
  };

  var openPopup = function (pin, advert) {
    resetActiveClass();

    pin.classList.add('pin--active');
    var currentCard = window.card.getAdvertCard(advert);
    window.showCard(currentCard);
    window.card.renderDialogAvatar(advert);
  };

  var closePopup = function () {
    resetActiveClass();

    window.data.dialog.classList.add('hidden');
  };

  var setHandlers = function (pin, advert) {
    pin.addEventListener('click', function () {
      openPopup(pin, advert);
    });
    pin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ENTER_KEYCODE) {
        openPopup(pin, advert);
      }
    });
  };

  var render = function (advertList) {
    while (pinsMap.firstChild) {
      pinsMap.removeChild(pinsMap.firstChild);
    }

    var fragment = document.createDocumentFragment();
    advertList.forEach(function (advert) {
      var currentPin = getPin(advert);
      fragment.appendChild(currentPin);
      setHandlers(currentPin, advert);
    });
    pinsMap.appendChild(fragment);

    var dialogCard = window.card.getAdvertCard(advertList[0]);
    window.showCard(dialogCard);
    window.card.renderDialogAvatar(advertList[0]);
  };

  return {
    render: render,
    closePopup: closePopup
  };
})();
