'use strict'

import { FormValidate } from './FormValidator.js';
import {MakeCard} from "./Сard.js";

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validateConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.button',
  inactiveButtonClass: 'button_type_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-span-error_active',
}

const cardConfig = {
  buttonLikeSelector: '.button_icon_like',
  buttonDelSelector: '.button_icon_delete',
  buttonClosePopupSelector: '.button_close_image',
  imagePopupContainerSelector: '.popup_type_image',
  imagePopupSelector: '.popup__image',
  captionPopupSelector: '.popup__caption',
  cardItemSelector: '.photo-grid__item',
  cardImageSelector: '.photo-grid__image',
  cardCaptionSelector: '.photo-grid__caption',
  buttonLikeActiveClass: 'button_icon_like-active',
  popupOpenedClass: 'popup_opened',
}

const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileCloseButton = document.querySelector('.button_close_profile');
const popupProfileForm = document.querySelector('.popup__form_type_edit-profile');
const popupProfileOpenButton = document.querySelector('.button_icon_edit');
const popupProfileName = document.querySelector('.profile__name');
const popupProfileOccupation = document.querySelector('.profile__occupation');
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

function checkKeypressEsc (evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened')); //на странице только 1 popup_opened
  }
}

function closePopup (popup) {
  popup.classList.remove('popup_opened'); /*закрыть попап*/
  document.removeEventListener('keydown', checkKeypressEsc);
}

function openPopup (popup) {
  popup.classList.add('popup_opened'); /*вывод попапа*/
  document.addEventListener('keydown', checkKeypressEsc);
}

function preloadProfileData () {
  popupProfileInputName.value = popupProfileName.textContent; /*присваивание имени*/
  popupProfileInputOccupation.value = popupProfileOccupation.textContent; /*присваивание брифа*/
}

function openPopupProfile () {
  preloadProfileData();
  openPopup(popupProfile);
  popupProfileValidate.switchButtonState();
}

function handleProfileEditSubmit (evt) {
  evt.preventDefault();
  popupProfileName.textContent = popupProfileInputName.value; /*Замена имени*/
  popupProfileOccupation.textContent = popupProfileInputOccupation.value; /*Замена брифа*/
  closePopup(popupProfile);
}

function handleCardAddSubmit (evt) {
  evt.preventDefault();
  const card = new MakeCard(popupCardInputImageCaption.value, popupCardInputImageSrc.value, '#photo-grid__template', cardConfig).generateCard();
  photoGridSection.prepend(card); // add content in html
  closePopup(popupCardContainer);
  popupCardForm.reset();
  popupCardValidate.switchButtonState();
}

function preloadImages () {
  initialCards.forEach(function (elem) {
    const card = new MakeCard(elem.name, elem.link, '#photo-grid__template', cardConfig).generateCard();
    photoGridSection.prepend(card); //add content in html
  });
}

function getListenerPopupOverlay () {
  const popupList = Array.from(document.querySelectorAll('.popup')); //Нашли все попапы
  popupList.forEach((popupElement) => {
    const popupOverlay = popupElement.querySelector('.popup__overlay'); //Для каждого попапа нашли свой overlay
    popupOverlay.addEventListener('click', () => closePopup(popupElement)); //добавили прослушку
  })
}


preloadImages();
getListenerPopupOverlay();
preloadProfileData();
popupProfileValidate.enableValidate();
popupCardValidate.enableValidate();
popupProfileOpenButton.addEventListener('click', openPopupProfile);
popupProfileCloseButton.addEventListener('click', () => closePopup(popupProfile));
popupProfileForm.addEventListener('submit', handleProfileEditSubmit);//popup редактирования профиля
popupCardOpenButton.addEventListener('click', () => openPopup(popupCardContainer));
popupCardCloseButton.addEventListener('click', () => closePopup(popupCardContainer));
popupCardForm.addEventListener('submit', handleCardAddSubmit);//popup добавления контента
imagePopupCloseButton.addEventListener('click', () => closePopup(imagePopupContainer))