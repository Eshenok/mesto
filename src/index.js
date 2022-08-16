'use strict'

import FormValidate from '../scripts/FormValidator.js';
import MakeCard from "../scripts/Сard.js";
import Section from "../scripts/Section.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import {initialCards, cardConfig, validateConfig} from "../scripts/constants.js";
import UserInfo from "../scripts/UserInfo.js";

function preloadCard (array) { // Предзагрузка карточек (обязательно array), обходим массив и вызываем функцию генерации карточек.
  array.forEach((elem) => {
    generateCard(elem);
  })
}

/*
 * Создаем const -> Секцию -> в нее передаем items (карточки) и функцию добавления чего-то в разметку и секцию куда добавить
 * внутри renderer -> создаем константу карточки и генерим ее через Card
 * затем вставляем в разметку.
 */
function generateCard (elem) {
  const preloadedCards = new Section({
    item: elem,
    renderer: (item) => {
    const card = new MakeCard(item, '#photo-grid__template', cardConfig);
    const cardElement = card.generateCard();
    preloadedCards.setItem(cardElement);
    }
    }, '.photo-grid');
  preloadedCards.renderItems();
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
  popupCardValidate.switchButtonState(); // меняем состояние кнопки после reset();
}

// const работы попапа профиля
const userInfo = new UserInfo('.profile__name', '.profile__occupation');
const profilePopup = new PopupWithForm('.popup_type_profile', handleProfileEditSubmit);
const profileOpenButton = document.querySelector('.button_icon_edit');
const popupProfileValidate = new FormValidate(validateConfig, '.popup__form_type_edit-profile');

// const работы попапа добавления карточки
const cardPopup = new PopupWithForm('.popup_type_card', handleCardAddSubmit);
const cardOpenButton = document.querySelector('.button_icon_add');
const popupCardValidate = new FormValidate(validateConfig, '.popup__form_type_add-content');

preloadCard(initialCards);
profilePopup.setEventListeners();
cardPopup.setEventListeners();
popupProfileValidate.enableValidate();
popupCardValidate.enableValidate();

profileOpenButton.addEventListener('click', () => { //Прослушка кнопки открытия попапа редактирования профиля
  const userInfoValues = userInfo.getUserInfo();
  const inputName = document.querySelector('.popup__input_type_name');
  const inputOccupation = document.querySelector('.popup__input_type_occupation');
  inputName.value = userInfoValues.name;
  inputOccupation.value = userInfoValues.occupation; // вставляем в инпуты значения
  popupProfileValidate.switchButtonState();
  profilePopup.openPopup();
});

cardOpenButton.addEventListener('click', () => {
  popupCardValidate.switchButtonState();
  cardPopup.openPopup();
});

// preloadImages();
// getListenerPopupOverlay();
// preloadProfileData();

// popupProfileOpenButton.addEventListener('click', openPopupProfile);
// popupProfileCloseButton.addEventListener('click', () => closePopup(popupProfile));
// popupProfileForm.addEventListener('submit', handleProfileEditSubmit);//popup редактирования профиля
// popupCardOpenButton.addEventListener('click', () => openPopup(popupCardContainer));
// popupCardCloseButton.addEventListener('click', () => closePopup(popupCardContainer));
// popupCardForm.addEventListener('submit', handleCardAddSubmit);//popup добавления контента
// imagePopupCloseButton.addEventListener('click', () => closePopup(imagePopupContainer))


// function checkKeypressEsc (evt) {
//   if (evt.key === 'Escape') {
//     closePopup(document.querySelector('.popup_opened')); //на странице только 1 popup_opened
//   }
// }
//
// function closePopup (popup) {
//   popup.classList.remove('popup_opened'); /*закрыть попап*/
//   document.removeEventListener('keydown', checkKeypressEsc);
// }
//
// function openPopup (popup) {
//   popup.classList.add('popup_opened'); /*вывод попапа*/
//   document.addEventListener('keydown', checkKeypressEsc);
// }


// function preloadProfileData () {
//   popupProfileInputName.value = popupProfileName.textContent; /*присваивание имени*/
//   popupProfileInputOccupation.value = popupProfileOccupation.textContent; /*присваивание брифа*/
// }
//
// function openPopupProfile () {
//   preloadProfileData();
//   openPopup(popupProfile);
//   popupProfileValidate.switchButtonState();
// }

// function getListenerPopupOverlay () {
//   const popupList = Array.from(document.querySelectorAll('.popup')); //Нашли все попапы
//   popupList.forEach((popupElement) => {
//     const popupOverlay = popupElement.querySelector('.popup__overlay'); //Для каждого попапа нашли свой overlay
//     popupOverlay.addEventListener('click', () => closePopup(popupElement)); //добавили прослушку
//   })
// }