'use strict';

window.data = (function () {
  var COUNT = 8;
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
  var dialogTemplate = document.querySelector('.dialog__panel');

  return {
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    getRandomItem: function (array) {
      var randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    },
    getUniqueItem: function (array) {
      return array.splice(this.getRandomInt(0, array.length - 1), 1);
    },
    getRandomLengthArray: function (array) {
      var arrayCopy = array.slice();
      var arrayNew = [];
      var arrayLengthNew = this.getRandomInt(1, array.length);
      for (var i = 0; i < arrayLengthNew; i++) {
        arrayNew.push(this.getUniqueItem(arrayCopy)[0]);
      }
      return arrayNew;
    },
    getAdvert: function () {
      var locationX = this.getRandomInt(MAP.width.min, MAP.width.max);
      var locationY = this.getRandomInt(MAP.height.min, MAP.height.max);

      return {
        author: {
          avatar: 'img/avatars/user' + window.data.getUniqueItem(USER_IDS) + '.png'
        },

        offer: {
          title: this.getUniqueItem(TITLES),
          address: locationX + ',' + locationY,
          price: this.getRandomInt(PRICE.min, PRICE.max),
          type: this.getRandomItem(TYPES),
          rooms: this.getRandomInt(ROOMS.min, ROOMS.max),
          guests: this.getRandomInt(ROOMS.min * 2, ROOMS.max * 2),
          checkin: this.getRandomItem(CHECKINS),
          checkout: this.getRandomItem(CHECKOUTS),
          features: this.getRandomLengthArray(FEATURES),
          description: '',
          photos: []
        },

        location: {
          x: locationX,
          y: locationY
        }
      };
    },
    getAdvertList: function () {
      var advertList = [];
      for (var i = 0; i < COUNT; i++) {
        advertList.push(this.getAdvert());
      }
      return advertList;
    },
    getLodgeType: function (type) {
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
    },
    getAdvertCard: function (advert) {
      var lodgeCard = dialogTemplate.cloneNode(true);

      lodgeCard.querySelector('.lodge__title').textContent = advert.offer.title;
      lodgeCard.querySelector('.lodge__address').textContent = advert.offer.address;
      lodgeCard.querySelector('.lodge__price').textContent = advert.offer.price + ' ' + '\u20BD/ночь';
      lodgeCard.querySelector('.lodge__type').textContent = window.data.getLodgeType(advert.offer.type);
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
    }
  };

})();

window.advertList = window.data.getAdvertList();
window.dialog = document.querySelector('.dialog');
window.ENTER_KEYCODE = 13;
window.ESC_KEYCODE = 27;
