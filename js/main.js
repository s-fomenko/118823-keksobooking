'use strict';

var createMockData = function () {
  var mockData = [];
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

var mockData = createMockData();

var makeMapActive = function () {
  var pageMap = document.querySelector('.map');
  pageMap.classList.remove('map--faded');
};

makeMapActive();

var mapArea = document.querySelector('.map__pins');
var mapPin = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var fragment = document.createDocumentFragment();

var createPin = function (data) {
  var item = mapPin.cloneNode(true);
  item.style.left = data.location.x + 'px';
  item.style.top = data.location.y + 'px';
  item.querySelector('img').src = data.author.avatar;
  item.querySelector('img').alt = data.offer.type;
  fragment.appendChild(item);

  return item;
};

var createPins = function (data) {
  data.forEach(function (item) {
    fragment.appendChild(createPin(item));
  });
};

createPins(mockData);

mapArea.appendChild(fragment);


