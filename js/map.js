'use strict';

var COUNT = 8;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var USER_IDS = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08'
];
var TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var PRICE = {
  min: 1000,
  max: 1000000
};
var TYPES = [
  'flat',
  'house',
  'bungalo'
];
var ROOMS = {
  min: 1,
  max: 5
};
var CHECKINS = [
  '12:00',
  '13:00',
  '14:00'
];
var CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00'
];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var MAP = {
  width: {
    min: 300,
    max: 900
  },
  height: {
    min: 100,
    max: 500
  }
};

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getRandomItem = function (array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

var getUniqueItem = function (array) {
  return array.splice(getRandomInt(0, array.length - 1), 1);
};

var getRandomLengthArray = function (array) {
  var arrayCopy = array.slice();
  var arrayNew = [];
  var arrayLengthNew = getRandomInt(1, array.length);
  for (var i = 0; i < arrayLengthNew; i++) {
    arrayNew.push(getUniqueItem(arrayCopy)[0]);
  }
  return arrayNew;
};

function getAdvert() {
  var locationX = getRandomInt(MAP.width.min, MAP.width.max);
  var locationY = getRandomInt(MAP.height.min, MAP.height.max);

  return {
    author: {
      avatar: 'img/avatars/user' + getUniqueItem(USER_IDS) + '.png'
    },

    offer: {
      title: getUniqueItem(TITLES),
      address: locationX + ',' + locationY,
      price: getRandomInt(PRICE.min, PRICE.max),
      type: getRandomItem(TYPES),
      rooms: getRandomInt(ROOMS.min, ROOMS.max),
      guests: getRandomInt(ROOMS.min * 2, ROOMS.max * 2),
      checkin: getRandomItem(CHECKINS),
      checkout: getRandomItem(CHECKOUTS),
      features: getRandomLengthArray(FEATURES),
      description: '',
      photos: []
    },

    location: {
      x: locationX,
      y: locationY
    }
  };
}

var getAdvertList = function () {
  var advertList = [];
  for (var i = 0; i < COUNT; i++) {
    advertList.push(getAdvert());
  }
  return advertList;
};

var getLodgeType = function (type) {
  var typeInRussian = '';
  switch (type) {
    case 'flat':
      typeInRussian = 'Квартира';
      break;
    case 'bungalo':
      typeInRussian = 'Бунгало';
      break;
    case 'house':
      typeInRussian = 'Дом';
      break;
    default:
      typeInRussian = 'Не указан';
  }
  return typeInRussian;
};

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

var dialogTemplate = document.querySelector('.dialog__panel');
var getAdvertCard = function (advert) {
  var lodgeCard = dialogTemplate.cloneNode(true);

  lodgeCard.querySelector('.lodge__title').textContent = advert.offer.title;
  lodgeCard.querySelector('.lodge__address').textContent = advert.offer.address;
  lodgeCard.querySelector('.lodge__price').textContent = advert.offer.price + ' ' + '\u20BD/ночь';
  lodgeCard.querySelector('.lodge__type').textContent = getLodgeType(advert.offer.type);
  lodgeCard.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + advert.offer.guests + ' гостей в ' + advert.offer.rooms + ' комнатах';
  lodgeCard.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;

  lodgeCard.querySelector('.lodge__features').textContent = '';
  advert.offer.features.forEach(function (element) {
    var span = document.createElement('span');
    span.className = 'feature__image feature__image--' + element;
    lodgeCard.querySelector('.lodge__features').appendChild(span);
  });

  lodgeCard.querySelector('.lodge__description').textContent = advert.offer.description;

  return lodgeCard;
};

var dialog = document.querySelector('.dialog');
var renderDialogAvatar = function (advert) {
  dialog.querySelector('.dialog__title img').src = advert.author.avatar;
};


var renderAdvertCard = function (dialogCard) {
  dialog.classList.remove('hidden');
  var dialogPanel = dialog.querySelector('.dialog__panel');
  var fragment = document.createDocumentFragment();
  fragment.appendChild(dialogCard);
  dialog.replaceChild(fragment, dialogPanel);
};

var tokyoPinMap = 'tokyo__pin-map';
var advertList = getAdvertList();
renderPin(advertList, tokyoPinMap);

var dialogCard = getAdvertCard(advertList[0]);
renderAdvertCard(dialogCard);
renderDialogAvatar(advertList[0]);

var pinsArray = document.getElementsByClassName('pin');
var dialogClose = dialog.querySelector('.dialog__close');

var closePopup = function () {
  dialog.classList.add('hidden');
  for (var j = 0; j < pinsArray.length; j++) {
    pinsArray[j].classList.remove('pin--active');
  }
};

var openPopup = function (currentPin) {
  for (var j = 0; j < pinsArray.length; j++) {
    pinsArray[j].classList.remove('pin--active');
  }
  currentPin.classList.add('pin--active');

  var thisLeft = parseFloat(currentPin.style.left);
  var thisTop = parseFloat(currentPin.style.top);

  for (var k = 0; k < advertList.length; k++) {
    if ((advertList[k].location.x === thisLeft) && (advertList[k].location.y === thisTop)) {
      var currentCard = getAdvertCard(advertList[k]);
      renderAdvertCard(currentCard);
      renderDialogAvatar(advertList[k]);
    }
  }
};

function setHandlers(i) {
  pinsArray[i].addEventListener('click', function () {
    var currentPin = pinsArray[i];
    openPopup(currentPin);
  });
  pinsArray[i].addEventListener('keydown', function (evt) {
    var currentPin = pinsArray[i];
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup(currentPin);
    }
  });
}

for (var i = 0; i < pinsArray.length; i++) {
  setHandlers(i);
}

dialogClose.addEventListener('click', function () {
  closePopup();
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
});
