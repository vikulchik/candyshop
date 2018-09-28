// Пиши нормальные названия переменных
'use strict';

var arrName = [
  'Чесночные сливки',
  'Огуречный педант',
  'Молочная хрюша',
  'Грибной шейк',
  'Баклажановое безумие',
  'Паприколу итальяно',
  'Нинзя-удар васаби',
  'Хитрый баклажан',
  'Горчичный вызов',
  'Кедровая липучка',
  'Корманный портвейн',
  'Чилийский задира',
  'Беконовый взрыв',
  'Арахис vs виноград',
  'Сельдерейная душа',
  'Початок в бутылке',
  'Чернющий мистер чеснок',
  'Раша федераша',
  'Кислая мина',
  'Кукурузное утро',
  'Икорный фуршет',
  'Новогоднее настроение',
  'С пивком потянет',
  'Мисс креветка',
  'Бесконечный взрыв',
  'Невинные винные',
  'Бельгийское пенное',
  'Острый язычок',
];

var images = [
  'gum-cedar.jpg',
  'gum-chile.jpg',
  'gum-eggplant.jpg',
  'gum-mustard.jpg',
  'gum-portwine.jpg',
  'gum-wasabi.jpg',
  'ice-cucumber.jpg',
  'ice-eggplant.jpg',
  'ice-garlic.jpg',
  'ice-italian.jpg',
  'ice-mushroom.jpg',
  'ice-pig.jpg',
  'marmalade-beer.jpg',
  'marmalade-caviar.jpg',
  'marmalade-corn.jpg',
  'marmalade-new-year.jpg',
  'marmalade-sour.jpg',
  'marshmallow-bacon.jpg',
  'marshmallow-beer.jpg',
  'marshmallow-shrimp.jpg',
  'marshmallow-spicy.jpg',
  'marshmallow-wine.jpg',
  'soda-bacon.jpg',
  'soda-celery.jpg',
  'soda-cob.jpg',
  'soda-garlic.jpg',
  'soda-peanut-grapes.jpg',
  'soda-russian.jpg',
];

var contentsValue = [
  'молоко',
  'сливки',
  'вода',
  'пищевой краситель',
  'патока',
  'ароматизатор бекона',
  'ароматизатор свинца',
  'ароматизатор дуба, идентичный натуральному',
  'ароматизатор картофеля',
  'лимонная кислота',
  'загуститель',
  'эмульгатор',
  'консервант:сорбат',
  'калия',
  'посолочная',
  'смесь: соль, нитрит',
  'натрия',
  'ксилит',
  'карбамид',
  'вилларибо',
  'виллабаджо',
];

var catalogCards = document.querySelector('.catalog__cards ');
var catalogRoad = document.querySelector('.catalog__load');
var goodCards = document.querySelector('.goods__cards');
var goodCardsEmpty = document.querySelector('.goods__card-empty');

var randomNumber = function (min, max) {
  var rand = min + Math.random() * (max - min);
  return Math.round(rand);
};

var getClassName = function (value, className) {
  if (value === 1) {
    className.classList.add('stars__rating--one');
  }
  if (value === 2) {
    className.classList.add('stars__rating--two');
  }
  if (value === 3) {
    className.classList.add('stars__rating--third');
  }
  if (value === 4) {
    className.classList.add('stars__rating--four');
  }
  if (value === 5) {
    className.classList.add('stars__rating--five');
  }
};

var randomArr = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomIngredients = function (arr) {
  var ingredientsLength = randomNumber(0, arr.length);
  var ingredientsText = [];
  for (var i = 0; i < ingredientsLength; i++) {
    ingredientsText.push(arr[i]);
  }
  return ingredientsText.join(', ');
};

var getGoodList = function () {
  var goodList = [];
  for (var i = 0; i < 27; i++) { // 27 магическое число - заводи константу сверху
    var objectList = {
      name: randomArr(arrName),
      picture: randomArr(images),
      amount: randomNumber(0, 20),
      price: randomNumber(100, 1500),
      weight: randomNumber(30, 300),
      rating: {
        value: randomNumber(1, 5),
        number: randomNumber(10, 900),
      },
      nutritionFacts: {
        sugar: Math.random() >= 0.5,
        energy: randomNumber(70, 500),
        contents: getRandomIngredients(contentsValue),
      },
    };
    goodList.push(objectList);
  }
  return goodList;
};

catalogCards.classList.remove('catalog__cards--load');
catalogRoad.classList.add('visually-hidden');

var getCreateCard = function (content) {
  var card = document.querySelector('#card').content;
  var catalogCardTemplate = card.querySelector('.catalog__card');
  var cardElement = catalogCardTemplate.cloneNode(true);
  var starsRating = cardElement.querySelector('.stars__rating');
  var cardTitle = cardElement.querySelector('.card__title');
  var starCount = cardElement.querySelector('.star__count');
  var cardPrice = cardElement.querySelector('.card__price');
  var cardCharacteristic = cardElement.querySelector('.card__characteristic');
  var cardCompositionList = cardElement.querySelector('.card__composition-list');

  if (content.amount > 5) {
    catalogCardTemplate.classList.add('card--in-stock');
  }
  if (content.amount > 1 || content.amount < 5) {
    catalogCardTemplate.classList.add('card--little');
  }
  if (content.amount === 0) {
    catalogCardTemplate.classList.add('card--soon');
  }
  cardTitle.innerHTML = content.name;
  starCount.innerHTML = content.rating.number;
  cardPrice.innerHTML = content.price + '<span class="card__currency">₽</span><span class="card__weight">/' + content.weight + 'Г</span>';
  starsRating.innerHTML = content.rating.value;
  getClassName(content.rating.value, starsRating);
  if (content.nutritionFacts.sugar) {
    cardCharacteristic.textContent = 'Содержит сахар';
  }

  if (!content.nutritionFacts.sugar) {
    cardCharacteristic.textContent = 'Без сахара';
  }
  cardCompositionList.innerHTML = content.nutritionFacts.contents;
  return cardElement;
};

var goodList = getGoodList();
var renderCard = function (data) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < data.length; i++) {
    fragment.appendChild(getCreateCard(data[i]));
  }
  console.log(fragment);
};

var getCreateGoodCards = function (content) {
  var card = document.querySelector('#card-order').content;
  var catalogGoodCardTemplate = card.querySelector('.goods_card');
  var goodCardElement = catalogGoodCardTemplate.cloneNode(true);
  var cardTitle = goodCardElement.querySelector('.card-order__title');
  var cardPrice = goodCardElement.querySelector('.card-order__price');
  cardTitle.innerHTML = content.name;
  cardPrice.innerHTML = content.price + '₽';
  return goodCardElement;
};

var renderGoodCard = function (data) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 3; i++) {
    fragment.appendChild(getCreateGoodCards(data[i]));
  }
  console.log(fragment);
};

goodCards.classList.remove('goods__cards--empty');
goodCardsEmpty.classList.add('visually-hidden');

renderGoodCard(goodList);
renderCard(goodList);
