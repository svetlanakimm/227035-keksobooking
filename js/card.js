'use strict';

window.card = (function () {

  return {
    renderDialogAvatar: function (advert) {
      window.data.dialog.querySelector('.dialog__title img').src = advert.author.avatar;
    }
    // ,
    // renderAdvertCard: function (dialogCard) {
    //   window.data.dialog.classList.remove('hidden');
    //   var dialogPanel = window.data.dialog.querySelector('.dialog__panel');
    //   var fragment = document.createDocumentFragment();
    //   fragment.appendChild(dialogCard);
    //   window.data.dialog.replaceChild(fragment, dialogPanel);
    // }
  };

})();
