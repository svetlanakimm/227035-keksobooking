'use strict';

window.card = (function () {

  return {
    renderDialogAvatar: function (advert) {
      window.dialog.querySelector('.dialog__title img').src = advert.author.avatar;
    },
    renderAdvertCard: function (dialogCard) {
      window.dialog.classList.remove('hidden');
      var dialogPanel = window.dialog.querySelector('.dialog__panel');
      var fragment = document.createDocumentFragment();
      fragment.appendChild(dialogCard);
      window.dialog.replaceChild(fragment, dialogPanel);
    }
  };

})();
