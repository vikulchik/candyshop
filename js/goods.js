'use strict';

var names = [
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
  'img/cards/gum-cedar.jpg',
  'img/cards/gum-chile.jpg',
  'img/cards/gum-eggplant.jpg',
  'img/cards/gum-mustard.jpg',
  'img/cards/gum-portwine.jpg',
  'img/cards/gum-wasabi.jpg',
  'img/cards/ice-cucumber.jpg',
  'img/cards/ice-eggplant.jpg',
  'img/cards/ice-garlic.jpg',
  'img/cards/ice-italian.jpg',
  'img/cards/ice-mushroom.jpg',
  'img/cards/ice-pig.jpg',
  'img/cards/marmalade-beer.jpg',
  'img/cards/marmalade-caviar.jpg',
  'img/cards/marmalade-corn.jpg',
  'img/cards/marmalade-new-year.jpg',
  'img/cards/marmalade-sour.jpg',
  'img/cards/marshmallow-bacon.jpg',
  'img/cards/marshmallow-beer.jpg',
  'img/cards/marshmallow-shrimp.jpg',
  'img/cards/marshmallow-spicy.jpg',
  'img/cards/marshmallow-wine.jpg',
  'img/cards/soda-bacon.jpg',
  'img/cards/soda-celery.jpg',
  'img/cards/soda-cob.jpg',
  'img/cards/soda-garlic.jpg',
  'img/cards/soda-peanut-grapes.jpg',
  'img/cards/soda-russian.jpg',
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

var options = {
  amount: {
    min: 0,
    max: 20,
    cardInStock: 0,
    cardLittle: 1,
    cardBig: 5,
    cardSoon: 0
  },
  price: {
    min: 100,
    max: 1500
  },
  weight: {
    min: 30,
    max: 300
  },
  rating: {
    value: {
      min: 1,
      max: 5
    },
    number: {
      min: 10,
      max: 900
    }
  },
  nutritionFacts: {
    energy: {
      min: 70,
      max: 500
    }
  },
  countList: 27,
  countGoodCard: 3
};

var catalogCards = document.querySelector('.catalog__cards ');
var catalogRoad = document.querySelector('.catalog__load');
var goodCards = document.querySelector('.goods__cards');
var goodCardsEmpty = document.querySelector('.goods__card-empty');
var cardOrder = document.querySelector('#card-order').content;
var card = document.querySelector('#card').content;

var getRandomNumber = function (min, max) {
  var rand = min + Math.random() * (max - min);
  return Math.round(rand);
};

var setClassName = function (value, className) {
  switch (value) {
    case 1:
      className.classList.add('stars__rating--one');
      break;
    case 2:
      className.classList.add('stars__rating--two');
      break;
    case 3:
      className.classList.add('stars__rating--three');
      break;
    case 4:
      className.classList.add('stars__rating--four');
      break;
    case 5:
      className.classList.add('stars__rating--five');
      break;
  }
};

var getRandomArr = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomIngredients = function (arr) {
  var ingredientsLength = getRandomNumber(0, arr.length);
  var ingredientsText = [];
  for (var i = 0; i < ingredientsLength; i++) {
    ingredientsText.push(arr[i]);
  }
  return ingredientsText.join(', ');
};

var getGoodList = function () {
  var goodList = [];
  for (var i = 0; i < options.countList; i++) {
    var objectList = {
      name: getRandomArr(names),
      picture: getRandomArr(images),
      amount: getRandomNumber(options.amount.min, options.amount.max),
      price: getRandomNumber(options.price.min, options.price.max),
      weight: getRandomNumber(options.weight.min, options.weight.max),
      rating: {
        value: getRandomNumber(options.rating.value.min, options.rating.value.max),
        number: getRandomNumber(options.rating.number.min, options.rating.number.max),
      },
      nutritionFacts: {
        sugar: Math.random() >= 0.5,
        energy: getRandomNumber(options.nutritionFacts.energy.min, options.nutritionFacts.energy.max),
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
  var catalogCardTemplate = card.querySelector('.catalog__card');
  var cardElement = catalogCardTemplate.cloneNode(true);
  var starsRating = cardElement.querySelector('.stars__rating');
  var cardTitle = cardElement.querySelector('.card__title');
  var starCount = cardElement.querySelector('.star__count');
  var cardImg = cardElement.querySelector('.card__img');
  var cardPrice = cardElement.querySelector('.card__price');
  var cardCharacteristic = cardElement.querySelector('.card__characteristic');
  var cardCompositionList = cardElement.querySelector('.card__composition-list');

  if (content.amount > options.amount.cardInStock) {
    catalogCardTemplate.classList.add('card--in-stock');
  }
  if (content.amount >= options.amount.cardLittle || content.amount < options.amount.cardBig) {
    catalogCardTemplate.classList.add('card--little');
  }
  if (content.amount === options.amount.cardSoon) {
    catalogCardTemplate.classList.add('card--soon');
  }
  cardImg.src = content.picture;
  cardTitle.innerHTML = content.name;
  starCount.innerHTML = content.rating.number;
  cardPrice.innerHTML = content.price + '<span class="card__currency">₽</span><span class="card__weight">/' + content.weight + 'Г</span>';
  starsRating.innerHTML = content.rating.value;
  setClassName(content.rating.value, starsRating);
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
  catalogCards.appendChild(fragment);
};

var getGoodCards = function (content) {
  var catalogGoodCardTemplate = cardOrder.querySelector('.goods_card');
  var goodCardElement = catalogGoodCardTemplate.cloneNode(true);
  var cardTitle = goodCardElement.querySelector('.card-order__title');
  var cardPrice = goodCardElement.querySelector('.card-order__price');
  var cardOrderImg = goodCardElement.querySelector('.card-order__img');
  cardTitle.innerHTML = content.name;
  cardOrderImg.src = content.picture;
  cardPrice.innerHTML = content.price + '₽';
  return goodCardElement;
};

var renderGoodCard = function (data) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < options.countGoodCard; i++) {
    fragment.appendChild(getGoodCards(data[i]));
  }
  goodCards.appendChild(fragment);
};

goodCards.classList.remove('goods__cards--empty');
goodCardsEmpty.classList.add('visually-hidden');

renderGoodCard(goodList);
renderCard(goodList);
