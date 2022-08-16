'use strict'

import FormValidate from '../scripts/FormValidator.js';
import MakeCard from "../scripts/Сard.js";
import Section from "../scripts/Section.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import {initialCards, cardConfig, validateConfig} from "../scripts/constants.js";
import UserInfo from "../scripts/UserInfo.js";


const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileCloseButton = document.querySelector('.button_close_profile');
const popupProfileForm = document.querySelector('.popup__form_type_edit-profile');
const popupProfileOpenButton = document.querySelector('.button_icon_edit');
const popupProfileName = document.querySelector('.profile__name');
const popupProfileInputName = document.querySelector('.popup__input_type_name');
const popupProfileInputOccupation = document.querySelector('.popup__input_type_occupation'); //popup редактирования профиля
const popupCardContainer = document.querySelector('.popup_type_card');
const popupCardCloseButton = document.querySelector('.button_close_card');
const popupCardOpenButton = document.querySelector('.button_icon_add');
const popupCardInputImageCaption = document.querySelector('.popup__input_type_image-caption');
const popupCardInputImageSrc = document.querySelector('.popup__input_type_image-src');
const popupCardForm = document.querySelector('.popup__form_type_add-content');// popup Добавления контента
const imagePopupContainer = document.querySelector('.popup_type_image');//popup картинки
const imagePopupCloseButton = document.querySelector('.button_close_image');
const photoGridSection = document.querySelector('.photo-grid');

const popupProfileValidate = new FormValidate(validateConfig, '.popup__form_type_edit-profile');
const popupCardValidate = new FormValidate(validateConfig, '.popup__form_type_add-content');


function handleCardAddSubmit (evt) {
  evt.preventDefault();
  const card = new MakeCard(popupCardInputImageCaption.value, popupCardInputImageSrc.value, '#photo-grid__template', cardConfig).generateCard();
  photoGridSection.prepend(card); // add content in html
  closePopup(popupCardContainer);
  popupCardForm.reset();
  popupCardValidate.switchButtonState();
}

function preloadCard (array) {
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

/*
 * функция submit профиля
 * делает const getInputValues();
 * затем через класс userInfo меняет на страничке имя и профессию
 */
function handleProfileEditSubmit (evt) {
  evt.preventDefault();
  const inputValues = this.getInputValues();
  userInfo.setUserInfo(inputValues.popup__input_type_name, inputValues.popup__input_type_occupation);
  this.closePopup();
}

function handleCardAddSubmit (evt) {
  evt.preventDefault();

}

const userInfo = new UserInfo('.profile__name', '.profile__occupation');
const profilePopup = new PopupWithForm('.popup_type_profile', handleProfileEditSubmit);
const profileOpenButton = document.querySelector('.button_icon_edit');
profilePopup.setEventListeners();

profileOpenButton.addEventListener('click', () => {
  const userInfoValues = userInfo.getUserInfo();
  const inputName = document.querySelector('.popup__input_type_name');
  const inputOccupation = document.querySelector('.popup__input_type_occupation');
  inputName.value = userInfoValues.name;
  inputOccupation.value = userInfoValues.occupation;
  popupProfileValidate.switchButtonState();
  profilePopup.openPopup();
});



preloadCard(initialCards);
popupProfileValidate.enableValidate();
popupCardValidate.enableValidate();



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