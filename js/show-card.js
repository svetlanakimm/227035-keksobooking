'use strict';

(function () {
  window.showCard = function (dialogCard) {
    window.data.dialog.classList.remove('hidden');
    var dialogPanel = window.data.dialog.querySelector('.dialog__panel');
    var fragment = document.createDocumentFragment();
    fragment.appendChild(dialogCard);
    window.data.dialog.replaceChild(fragment, dialogPanel);
  };
})();
