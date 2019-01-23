'use strict';

var createMockData = function () {
  var mockData = [];
  var title = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негосеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var type = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

  var time = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var features = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var shuffle = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  for (var i = 0; i < 8; i++) {
    var dataItem = {};

    dataItem.author = {'avatar': 'img/avatars/user0' + (i + 1) + '.png'};
    dataItem.location = {'x': Math.floor(Math.random() * 1200), 'y': Math.floor(Math.random() * 600)};
    dataItem.offer = {
      'title': title[i],
      'address': dataItem.location.x + ', ' + dataItem.location.y,
      'price': Math.floor(Math.random() * (1000000 - 1000) + 1000),
      'type': type[Math.floor(Math.random() * type.length)],
      'rooms': Math.floor(Math.random() * (5 - 1) + 1),
      'guests': Math.floor(Math.random() * 10),
      'checkin': time[Math.floor(Math.random() * time.length)],
      'checkout': time[Math.floor(Math.random() * time.length)],
      'features': shuffle(features).slice(0, Math.floor(Math.random() * features.length + 1)),
      'description': '',
      'photos': shuffle(photos)
    };

    mockData.push(dataItem);
  }
  return mockData;
};

console.log(createMockData());

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

  item.addEventListener('click', handlePinClick);

  function handlePinClick(evt) {
    evt.currentTarget.classList.toggle('map__pin--active');
    var image = evt.currentTarget.querySelector('img');
    var mockItem = mockData.find(function (mockDataItem) {
      return image.src.indexOf(mockDataItem.author.avatar) === (image.src.length - mockDataItem.author.avatar.length);
    });

    createMapCards(mockItem);
  }

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

var createMapCard = function (data) {
  var mapCard = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var item = mapCard.cloneNode(true);

  item.querySelector('.popup__avatar').src = data.author.avatar;
  item.querySelector('.popup__title').textContent = data.offer.title;
  item.querySelector('.popup__text--address').textContent = data.offer.address;
  item.querySelector('.popup__text--price').textContent = data.offer.price.toLocaleString('ru') + ' \u20BD/ночь';
  item.querySelector('.popup__type').textContent = data.offer.type;
  item.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  item.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
  item.querySelector('.popup__description').textContent = data.offer.description;
  var buttonClose = item.querySelector('.popup__close');
  buttonClose.addEventListener('click', function () {
    item.classList.add('hidden');
  });

  var popupPhoto = item.querySelectorAll('.popup__photo');
  popupPhoto.forEach(function (photoItem, i) {
    photoItem.src = data.offer.photos[i];
  });

  return item;
};

var createMapCards = function (data) {
  var fragment = document.createDocumentFragment();
  var cardsArea = document.querySelector('body');

  fragment.appendChild(createMapCard(data));

  cardsArea.appendChild(fragment);
};

var closeArticleKeyDown = function (evt) {
  var article = document.querySelectorAll('.map__card');
  if (evt.keyCode === 27) {
    article.forEach(function (item) {
      item.classList.add('hidden');
    });
  }
};

window.addEventListener('keydown', closeArticleKeyDown);


