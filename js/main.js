'use strict';

var mockData = [];

var createMockData = function () {
  var type = ['palace', 'flat', 'house', 'bungalo'];

  for (var i = 1; i <= 8; i++) {
    var dataItem = {};

    dataItem.author = {'avatar': 'img/avatars/user0' + i + '.png'};
    dataItem.offer = {'type': type[Math.floor(Math.random() * type.length)]};
    dataItem.location = {'x': Math.floor(Math.random() * 1200), 'y': Math.floor(Math.random() * 131 + 500)};

    mockData.push(dataItem);
  }
  return mockData;
};

createMockData();

var pageMap = document.querySelector('.map');
pageMap.classList.remove('map--faded');

var mapArea = document.querySelector('.map__pins');
var mapPin = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var fragment = document.createDocumentFragment();

var createPin = function (data) {
  for (var i = 0; i < 8; i++) {
    var item = mapPin.cloneNode(true);
    item.style.left = data[i].location.x + 'px';
    item.style.right = data[i].location.y + 'px';
    item.querySelector('img').src = data[i].author.avatar;
    item.querySelector('img').alt = data[i].offer.type;
    fragment.appendChild(item);
  }
  return fragment;
};

// createPin(mockData);
console.log(createPin(mockData));


// console.log(data[i].author.avatar);
