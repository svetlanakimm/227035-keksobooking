'use strict';

(function () {

  var dialogClose = document.querySelector('.dialog__close');
  dialogClose.addEventListener('click', function () {
    window.pin.closePopup();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      window.pin.closePopup();
    }
  });

  var dialogCard = window.data.getAdvertCard(window.advertList[0]);
  window.card.renderAdvertCard(dialogCard);
  window.card.renderDialogAvatar(window.advertList[0]);
})();
