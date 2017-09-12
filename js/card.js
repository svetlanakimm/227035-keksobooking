'use strict';

window.card = (function () {
  var dialogTemplate = document.querySelector('.dialog__panel');
  return {
    renderDialogAvatar: function (advert) {
      window.data.dialog.querySelector('.dialog__title img').src = advert.author.avatar;
    },
    getAdvertCard: function (advert) {
      var lodgeCard = dialogTemplate.cloneNode(true);

      lodgeCard.querySelector('.lodge__title').textContent = advert.offer.title;
      lodgeCard.querySelector('.lodge__address').textContent = advert.offer.address;
      lodgeCard.querySelector('.lodge__price').textContent = advert.offer.price + ' ' + '\u20BD/ночь';
      lodgeCard.querySelector('.lodge__type').textContent = advert.offer.type;
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
