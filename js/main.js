'use strict';

var createMockData = function () {
  var data = [];
  var type = ['palace', 'flat', 'house', 'bungalo'];

  for (var i = 1; i <= 8; i++) {
    var dataItem = {};

    dataItem.author = {'avatar': 'img/avatars/user0' + i + '.png'};
    dataItem.offer = {'type': type[Math.floor(Math.random() * type.length)]};
    dataItem.location = {'x': Math.floor(Math.random() * 1200), 'y': Math.floor(Math.random() * 131 + 500)};

    data.push(dataItem);
  }
  return data;
};


console.log(createMockData());

/* var pageMap = document.querySelector('.map');
pageMap.classList.remove('map--faded');*/

