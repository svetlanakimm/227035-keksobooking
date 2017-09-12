'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          return onLoad(xhr.response);
        case 301:
          return onError('Код «' + xhr.status + '» - ресурс перемещен навсегда');
        case 400:
          return onError('Код «' + xhr.status + '» - плохой, неверный запрос');
        case 404:
          return onError('Код «' + xhr.status + '» - страница не найдена');
        case 500:
          return onError('Код «' + xhr.status + '» - внутренняя ошибка сервера');
        default:
          throw onError('Неизвестная ошибка: код «' + xhr.status + '»');
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    return xhr;
  };

  window.backend = {
    save: function (data, onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },
    load: function (onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    }
  };
})();
