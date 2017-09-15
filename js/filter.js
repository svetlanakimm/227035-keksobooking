'use strict';

window.filter = (function filter() {
  var filters = document.querySelector('.tokyo__filters');
  var housingType = filters.querySelector('#housing_type');
  var housingPrice = filters.querySelector('#housing_price');
  var housingRoomNumber = filters.querySelector('#housing_room-number');
  var housingGuestsNumber = filters.querySelector('#housing_guests-number');

  var mainFilter = function (advertList) {
    var selectedHousingType = housingType.options[housingType.selectedIndex].value;
    var selectedHousingPrice = housingPrice.options[housingPrice.selectedIndex].value;
    var selectedHousingRoomNumber = housingRoomNumber.options[housingRoomNumber.selectedIndex].value;
    var selectedHousingGuestsNumber = housingGuestsNumber.options[housingGuestsNumber.selectedIndex].value;

    var filteredAdvertList = advertList.slice(0);
    if (selectedHousingType !== 'any') {
      filteredAdvertList = filteredAdvertList.filter(function (it) {
        return it.offer.type === selectedHousingType;
      });
    }

    if (selectedHousingPrice !== 'any') {
      var price1 = 10000;
      var price2 = 50000;
      filteredAdvertList = filteredAdvertList.filter(function (it) {
        if (selectedHousingPrice === 'low') {
          return it.offer.price < price1;
        } else
        if (selectedHousingPrice === 'middle') {
          return (it.offer.price < price2) && (it.offer.price >= price1);
        } else
        if (selectedHousingPrice === 'high') {
          return it.offer.price > price2;
        }
        return true;
      });
    }

    if (selectedHousingRoomNumber !== 'any') {
      filteredAdvertList = filteredAdvertList.filter(function (it) {
        return it.offer.rooms === +selectedHousingRoomNumber;
      });
    }

    if (selectedHousingGuestsNumber !== 'any') {
      filteredAdvertList = filteredAdvertList.filter(function (it) {
        return it.offer.guests <= +selectedHousingGuestsNumber;
      });
    }

    return filteredAdvertList;
  };

  var setFiltering = function (advertList) {
    filters.addEventListener('change', function () {
      window.debounce(window.pin.render(mainFilter(advertList)));
    });
    window.pin.render(mainFilter(advertList));
  };

  return {
    setFiltering: setFiltering
  };
})();
