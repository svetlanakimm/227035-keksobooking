'use strict';

(function () {
  window.synchronizeFields = function (element1, element2, values1, values2, callback) {
    element1.addEventListener('change', function () {
      var tempValue = values2[values1.indexOf(element1.value)];
      callback(element2, tempValue);
    });
  };
})();
