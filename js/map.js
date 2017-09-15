'use strict';

(function () {
  var pinMain = document.querySelector('.pin__main');
  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var MARGIN_TOP = 10;
    var MARGIN_LEFT = 7;
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var address = document.querySelector('#address');
    var onMouseMove = function (evtMove) {
      evtMove.preventDefault();

      var shift = {
        x: startCoords.x - evtMove.clientX,
        y: startCoords.y - evtMove.clientY
      };

      startCoords = {
        x: evtMove.clientX,
        y: evtMove.clientY
      };

      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';

      var pinCoordsX = (pinMain.offsetLeft - shift.x) + pinMain.offsetWidth / 2 - MARGIN_LEFT + 'px';
      var pinCoordsY = (pinMain.offsetTop - shift.y) + pinMain.offsetHeight - MARGIN_TOP + 'px';
      address.value = 'x: ' + pinCoordsX + ', y: ' + pinCoordsY;
    };
    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
