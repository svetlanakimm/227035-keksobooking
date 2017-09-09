'use strict';

window.pin = (function () {

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

  var renderPin = function (adverts, className) {
    var pinsMap = document.querySelector('.' + className);
    var fragment = document.createDocumentFragment();

    adverts.forEach(function (element) {
      fragment.appendChild(getPin(element));
    });

    pinsMap.appendChild(fragment);
    return pinsMap;
  };

  var tokyoPinMap = 'tokyo__pin-map';

  renderPin(window.advertList, tokyoPinMap);

  return {
    closePopup: function () {
      window.dialog.classList.add('hidden');
      for (var j = 0; j < window.pin.pinsArray.length; j++) {
        window.pin.pinsArray[j].classList.remove('pin--active');
      }
    },
    openPopup: function (currentPin) {
      for (var j = 0; j < window.pin.pinsArray.length; j++) {
        window.pin.pinsArray[j].classList.remove('pin--active');
      }
      currentPin.classList.add('pin--active');

      var thisLeft = parseFloat(currentPin.style.left);
      var thisTop = parseFloat(currentPin.style.top);

      for (var k = 0; k < window.advertList.length; k++) {
        if ((window.advertList[k].location.x === thisLeft) && (window.advertList[k].location.y === thisTop)) {
          var currentCard = window.data.getAdvertCard(window.advertList[k]);
          window.card.renderAdvertCard(currentCard);
          window.card.renderDialogAvatar(window.advertList[k]);
        }
      }
    }
  };

})();

window.pin.pinsArray = document.getElementsByClassName('pin');
function setHandlers(i) {
  window.pin.pinsArray[i].addEventListener('click', function () {
    var currentPin = window.pin.pinsArray[i];
    window.pin.openPopup(currentPin);
  });
  window.pin.pinsArray[i].addEventListener('keydown', function (evt) {
    var currentPin = window.pin.pinsArray[i];
    if (evt.keyCode === window.ENTER_KEYCODE) {
      window.pin.openPopup(currentPin);
    }
  });
}

for (var i = 0; i < window.pin.pinsArray.length; i++) {
  setHandlers(i);
}
