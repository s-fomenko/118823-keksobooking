'use strict';

var createMockData = function () {
  var mockData = [];
  var type = ['palace', 'flat', 'house', 'bungalo'];

  for (var i = 1; i <= 8; i++) {
    var dataItem = {};

    dataItem.author = {'avatar': 'img/avatars/user0' + i + '.png'};
    dataItem.offer = {'type': type[Math.floor(Math.random() * type.length)]};
    dataItem.location = {'x': Math.floor(Math.random() * 1200), 'y': Math.floor(Math.random() * 131 + 250)};

    mockData.push(dataItem);
  }
  return mockData;
};

var makeMapActive = function () {
  var pageMap = document.querySelector('.map');
  pageMap.classList.remove('map--faded');
};


var createPin = function (data) {
  var mapPin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var item = mapPin.cloneNode(true);

  item.style.left = data.location.x + 'px';
  item.style.top = data.location.y + 'px';
  item.querySelector('img').src = data.author.avatar;
  item.querySelector('img').alt = data.offer.type;

  return item;
};

var createPins = function (data) {
  var fragment = document.createDocumentFragment();
  var mapArea = document.querySelector('.map__pins');

  data.forEach(function (item) {
    fragment.appendChild(createPin(item));
  });

  mapArea.appendChild(fragment);
};

var mockData = createMockData();


var makeFormdisabled = function () {
  var fieldset = document.querySelectorAll('fieldset');

  fieldset.forEach(function (item) {
    item.disabled = true;
  });
};

var makeFormEnabled = function () {
  var fieldset = document.querySelectorAll('fieldset');

  fieldset.forEach(function (item) {
    item.disabled = false;
  });
};

makeFormdisabled();

var adForm = document.querySelector('.ad-form');
var mapPin = document.querySelector('.map__pin--main');
var addressInput = document.getElementById('address');
var PIN_SIZE = 65;

addressInput.value = (mapPin.offsetLeft + (PIN_SIZE / 2)) + ', ' + (mapPin.offsetTop + (PIN_SIZE / 2));

mapPin.addEventListener('mouseup', function () {
  makeMapActive();
  createPins(mockData);
  makeFormEnabled();
  adForm.classList.remove('ad-form--disabled');
});


