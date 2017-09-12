'use strict';

(function () {
  var form = document.querySelector('.notice__form');
  var checkIn = form.querySelector('#timein');
  var checkOut = form.querySelector('#timeout');
  var type = form.querySelector('#type');
  var price = form.querySelector('#price');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
    element.value = value;
    element.placeHolder = value;
  };

  window.synchronizeFields(checkIn, checkOut, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
  window.synchronizeFields(checkOut, checkIn, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
  window.synchronizeFields(type, price, ['flat', 'bungalo', 'house', 'palace'], [1000, 0, 5000, 10000], syncValueWithMin);

  var onRoomNumberChange = function () {
    for (var k = 0; k < capacity.options.length; k++) {
      capacity.options[k].disabled = false;
    }
    switch (roomNumber.value) {
      case '1':
        capacity.value = 1;
        capacity.options[0].disabled = true;
        capacity.options[1].disabled = true;
        capacity.options[3].disabled = true;
        break;
      case '2':
        capacity.value = 2;
        capacity.options[0].disabled = true;
        capacity.options[2].disabled = true;
        capacity.options[3].disabled = true;
        break;
      case '3':
        capacity.value = 3;
        capacity.options[1].disabled = true;
        capacity.options[2].disabled = true;
        capacity.options[3].disabled = true;
        break;
      case '100':
        capacity.value = 0;
        capacity.options[0].disabled = true;
        capacity.options[1].disabled = true;
        capacity.options[2].disabled = true;
        break;
    }
  };

  roomNumber.addEventListener('change', onRoomNumberChange);
  onRoomNumberChange();

  var changeStyleBorderColor = function (evt) {
    if (!evt.target.validity.valid) {
      evt.target.style.borderColor = 'red';
    } else {
      evt.target.style.borderColor = 'transparent';
    }
  };

  var setDefaultValues = function () {
    form.reset();
  };

  var onSuccess = function () {
    setDefaultValues();
    if (document.body.firstChild.className === 'error-message') {
      document.body.firstChild.remove();
    }
  };

  var onError = function (message) {
    var node = document.createElement('div');
    node.classList.add('error-message');
    node.style = 'z-index: 110; position: fixed; margin: 0 auto; text-align: center; background-color: red; left: 0; right: 0; color: white; font-size: 20px;';
    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  form.addEventListener('input', changeStyleBorderColor, true);
  form.addEventListener('invalid', changeStyleBorderColor, true);
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onSuccess, onError);
  });

})();
