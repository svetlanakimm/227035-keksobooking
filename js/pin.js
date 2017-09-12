'use strict';

window.pin = (function () {

  var tokyoPinMap = 'tokyo__pin-map';
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

  var openPopup = function (currentPin) {
    window.pin.pinsArray = document.getElementsByClassName('pin');
    for (var j = 0; j < window.pin.pinsArray.length; j++) {
      window.pin.pinsArray[j].classList.remove('pin--active');
    }
    currentPin.classList.add('pin--active');

    var thisLeft = parseFloat(currentPin.style.left);
    var thisTop = parseFloat(currentPin.style.top);

    for (var k = 0; k < window.pin.advertList.length; k++) {
      if ((window.pin.advertList[k].location.x === thisLeft) && (window.pin.advertList[k].location.y === thisTop)) {
        var currentCard = window.card.getAdvertCard(window.pin.advertList[k]);
        window.showCard(currentCard);
        window.card.renderDialogAvatar(window.pin.advertList[k]);
      }
    }
  };
  var closePopup = function () {
    window.pin.pinsArray = document.getElementsByClassName('pin');
    window.data.dialog.classList.add('hidden');
    for (var j = 0; j < window.pin.pinsArray.length; j++) {
      window.pin.pinsArray[j].classList.remove('pin--active');
    }
  };
  var setHandlers = function (pin) {
    pin.addEventListener('click', function () {
      // var currentPin = pin;
      openPopup(pin);
    });
    pin.addEventListener('keydown', function (evt) {
      // var currentPin = pin;
      if (evt.keyCode === window.data.ENTER_KEYCODE) {
        openPopup(pin);
      }
    });
  };
  var renderPin = function (adverts, className) {
    var pinsMap = document.querySelector('.' + className);
    var fragment = document.createDocumentFragment();

    adverts.forEach(function (element) {
      var currentPin = getPin(element);
      fragment.appendChild(currentPin);
      setHandlers(currentPin);
    });

    pinsMap.appendChild(fragment);
    return pinsMap;
  };

  window.backend.load(function (response) {
    window.pin.advertList = response;
    renderPin(window.pin.advertList, tokyoPinMap);
    var dialogCard = window.card.getAdvertCard(window.pin.advertList[0]);
    window.showCard(dialogCard);
    window.card.renderDialogAvatar(window.pin.advertList[0]);
  },
  function (message) {
    var node = document.createElement('div');
    node.classList.add('error-message');
    node.style = 'z-index: 110; position: fixed; margin: 0 auto; text-align: center; background-color: red; left: 0; right: 0; color: white; font-size: 20px;';
    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  });

  return {
    closePopup: closePopup,
    openPopup: openPopup
  };

})();
