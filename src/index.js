'use strict'

import '../pages/index.css';
import FormValidate from './components/FormValidator.js';
import Card from "./components/Сard.js";
import Section from "./components/Section.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import { initialCards } from "./utils/initialCard.js";
import {cardConfig, validateConfig, profileOpenButton, cardOpenButton, inputOccupation, inputName} from "./utils/constants.js";
import UserInfo from "./components/UserInfo.js";

//Функции
function createCard ({name, link}) { // Создание карточки
  const card = new Card({name, link}, '#photo-grid__template', cardConfig, handleImageClick);
  return card.generateCard(); // возвращаем для использования
}

function handleImageClick (item) { // обработчик клика по карточке
  imagePopup.open(item);
}

function handleProfileEditSubmit (evt, values) {
  evt.preventDefault();
  const inputValues = values; // делает const getInputValues();
  userInfo.setUserInfo(inputValues.popup__input_type_name, inputValues.popup__input_type_occupation); // класс userInfo меняет на страничке имя и профессию
  this.close();
}

function handleCardAddSubmit (evt, values) {
  evt.preventDefault();
  const {'popup__input_type_image-caption': name, 'popup__input_type_image-src': link,} = values; // через деструктуризацию заменяем имена на нужные нам
  cardList.setItem(createCard({name, link}));
  this.close();
}

// const работы попапа профиля
const userInfo = new UserInfo('.profile__name', '.profile__occupation');
const profilePopup = new PopupWithForm('.popup_type_profile', handleProfileEditSubmit);
const popupProfileValidate = new FormValidate(validateConfig, '.popup__form_type_edit-profile');

// const работы попапа добавления карточки
const cardPopup = new PopupWithForm('.popup_type_card', handleCardAddSubmit);
const popupCardValidate = new FormValidate(validateConfig, '.popup__form_type_add-content');

// const работы попапа картинки
const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

// const вставка в html
const cardList = new Section({ renderer: (items) => { // внутри renderer -> создаем константу карточки и генерим ее через Card
    cardList.setItem(createCard(items));
  }
}, '.photo-grid');

//вызовы функций
cardList.renderItems(initialCards); // предзагрузка карточек на страницу
profilePopup.setEventListeners();
cardPopup.setEventListeners();
popupProfileValidate.enableValidate();
popupCardValidate.enableValidate();

//Прослушки
profileOpenButton.addEventListener('click', () => { //Прослушка кнопки открытия попапа редактирования профиля
  const userInfoValues = userInfo.getUserInfo();
  inputName.value = userInfoValues.name;
  inputOccupation.value = userInfoValues.occupation; // вставляем в инпуты значения
  popupProfileValidate.switchStateForm(); // Решение проблемы с сохранением ошибки после закрытия попапа
  profilePopup.open();
});

cardOpenButton.addEventListener('click', () => { //Прослушка кнопки открытия попапа добавления карточки
  popupCardValidate.switchStateForm();
  cardPopup.open();
});