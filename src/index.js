'use strict'

import '../pages/index.css';
import FormValidate from './scripts/FormValidator.js';
import MakeCard from "./scripts/Сard.js";
import Section from "./scripts/Section.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import {initialCards, cardConfig, validateConfig, profileOpenButton, cardOpenButton} from "./scripts/constants.js";
import UserInfo from "./scripts/UserInfo.js";

//Функции
function preloadCard (array) { // Предзагрузка карточек (обязательно array), обходим массив и вызываем функцию генерации карточек.
  array.forEach((elem) => {
    generateCard(elem);
  })
}

function generateCard (elem) { //Генерация карточек и добавление в разметку
  const preloadedCards = new Section({ // Создаем const -> Секцию -> в нее передаем items (карточки) и функцию добавления чего-то в разметку и секцию куда добавить
    item: elem,
    renderer: (item) => { // внутри renderer -> создаем константу карточки и генерим ее через Card
    const card = new MakeCard(item, '#photo-grid__template', cardConfig, handleImageClick);
    const cardElement = card.generateCard();
    preloadedCards.setItem(cardElement);
    }
    }, '.photo-grid');
  preloadedCards.renderItems(); // затем вставляем в разметку.
}

function handleImageClick (item) { // обработчик клика по карточке
  const cardPopup = new PopupWithImage(item, '.popup_type_image');
  cardPopup.setEventListeners();
  cardPopup.openPopup();
}

function handleProfileEditSubmit (evt) {
  evt.preventDefault();
  const inputValues = this.getInputValues(); // делает const getInputValues();
  userInfo.setUserInfo(inputValues.popup__input_type_name, inputValues.popup__input_type_occupation); // класс userInfo меняет на страничке имя и профессию
  this.closePopup();
}

function handleCardAddSubmit (evt) {
  evt.preventDefault();
  const {'popup__input_type_image-caption': name, 'popup__input_type_image-src': link,} = this.getInputValues(); // через деструктуризацию заменяем имена на нужные нам
  generateCard({name, link}); // генерим карточку и вставляем ее
  this.closePopup();
}

// const работы попапа профиля
const userInfo = new UserInfo('.profile__name', '.profile__occupation');
const profilePopup = new PopupWithForm('.popup_type_profile', handleProfileEditSubmit);
const popupProfileValidate = new FormValidate(validateConfig, '.popup__form_type_edit-profile');

// const работы попапа добавления карточки
const cardPopup = new PopupWithForm('.popup_type_card', handleCardAddSubmit);
const popupCardValidate = new FormValidate(validateConfig, '.popup__form_type_add-content');

//вызовы функций
preloadCard(initialCards);
profilePopup.setEventListeners();
cardPopup.setEventListeners();
popupProfileValidate.enableValidate();
popupCardValidate.enableValidate();

//Прослушки
profileOpenButton.addEventListener('click', () => { //Прослушка кнопки открытия попапа редактирования профиля
  const userInfoValues = userInfo.getUserInfo();
  const inputName = document.querySelector('.popup__input_type_name');
  const inputOccupation = document.querySelector('.popup__input_type_occupation');
  inputName.value = userInfoValues.name;
  inputOccupation.value = userInfoValues.occupation; // вставляем в инпуты значения
  popupProfileValidate.switchStateForm(); // Решение проблемы с сохранением ошибки после закрытия попапа
  profilePopup.openPopup();
});

cardOpenButton.addEventListener('click', () => { //Прослушка кнопки открытия попапа добавления карточки
  popupCardValidate.switchStateForm();
  cardPopup.openPopup();
});