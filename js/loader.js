'use strict';

(function () {
  window.backend.load(window.filter.setFiltering, function (message) {
    var node = document.createElement('div');
    node.classList.add('error-message');
    node.style = 'z-index: 110; position: fixed; margin: 0 auto; text-align: center; background-color: red; left: 0; right: 0; color: white; font-size: 20px;';
    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  });
})();
