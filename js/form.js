'use strict';

(function () {
  var form = document.querySelector('.notice__form');
  var checkIn = form.querySelector('#timein');
  var checkOut = form.querySelector('#timeout');
  var type = form.querySelector('#type');
  var price = form.querySelector('#price');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');

  var onCheckInChange = function (evt) {
    checkOut.value = evt.target.value;
  };

  var onTypeChange = function () {
    var prices = {
      flat: 1000,
      bungalo: 0,
      house: 5000,
      palace: 10000
    };
    price.setAttribute('min', prices[type.value]);
    price.setAttribute('placeholder', prices[type.value]);
  };

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

  checkIn.addEventListener('change', onCheckInChange);
  type.addEventListener('change', onTypeChange);
  roomNumber.addEventListener('change', onRoomNumberChange);
  onRoomNumberChange();

  var changeStyleBorderColor = function (evt) {
    if (!evt.target.validity.valid) {
      evt.target.style.borderColor = 'red';
    } else {
      evt.target.style.borderColor = 'transparent';
    }
  };

  var setDefaultValues = function (evt) {
    evt.preventDefault();
    form.submit();
    form.reset();
  };

  form.addEventListener('input', changeStyleBorderColor, true);
  form.addEventListener('invalid', changeStyleBorderColor, true);
  form.addEventListener('submit', setDefaultValues);

})();
