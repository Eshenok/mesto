'use strict'

import { initialCards, cardConfig, validateConfig } from "./initialCard.js";
import { FormValidate } from './FormValidator.js';
import { MakeCard } from "./Сard.js";

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

const popupProfileConfig = {
  popupInputNameSelector: '.popup__input_type_name',
  profileOccupationSelector: '.popup__input_type_occupation',
  popupInputOccupationSelector: '.profile__occupation',
  profileNameSelector: '.profile__name',
  popupOpenedClass: 'popup_opened',
  popupFormSelector: '.popup__form_type_edit-profile',
  popupOverlaySelector: '.popup__overlay',
  openProfileButtonSelector: '.button_icon_edit',
  closeProfileButtonSelector: '.button_close_profile',
}

class Popup {
  constructor(config) {
    this._config = config;
  }
  
  _checkKeypressEsc (evt) {
    if (evt.key === 'Escape') {
      this._closePopup(document.querySelector(`.${this._config.popupOpenedClass}`));
    }
  }
  
  _closePopup (popup) {
    popup.classList.remove(this._config.popupOpenedClass);
    document.removeEventListener('keydown', this._checkKeypressEsc);
  }
  
  _openPopup (popup) {
    popup.classList.add(this._config.popupOpenedClass);
    document.addEventListener('keydown', this._checkKeypressEsc);
  }
  
}

class PopupProfile extends Popup {
  constructor(config, popupSelector) {
    super(config);
    this._popup = document.querySelector(popupSelector);
  }

  _preloadProfileData () {
    this._popupProfileInputName.value = this._profileName.textContent; /*присваивание имени*/
    this._popupProfileInputOccupation.value = this._profileOccupation.textContent; /*присваивание брифа*/
  }

  _openProfilePopup () {
    this._preloadProfileData();
    this._openPopup(this._popup);
  }

  _handleProfileEditSubmit (evt) {
    evt.preventDefault();
    this._profileName.textContent = this._popupProfileInputName.value; /*Замена имени*/
    this._profileOccupation.textContent = this._popupProfileInputOccupation.value; /*Замена брифа*/
    this._closePopup(this._popup);
  }

  _setEventListeners () {
    this._popupOverlay.addEventListener('click', () => this._closePopup(this._popup)); //добавили прослушку на overlay
    this._popupProfileOpenButton.addEventListener('click', () => this._openProfilePopup()); // openPopup
    this._popupProfileCloseButton.addEventListener('click', () => this._closePopup(this._popup)); // closePopup
    // this._popupProfileForm.addEventListener('submit', this._handleProfileEditSubmit);
  }

  enablePopup () {
    this._popupProfileInputName = this._popup.querySelector(this._config.popupInputNameSelector); // input изменения имени
    this._popupProfileInputOccupation = this._popup.querySelector(this._config.popupInputOccupationSelector); // input изменения профессии
    this._profileName = document.querySelector(this._config.profileNameSelector); // Имя профиля
    this._profileOccupation = document.querySelector(this._config.profileOccupationSelector); // Профессия профиля
    this._popupOverlay = this._popup.querySelector(this._config.popupOverlaySelector); //нашли overlay
    this._popupProfileOpenButton = document.querySelector(this._config.openProfileButtonSelector);
    this._popupProfileCloseButton = document.querySelector(this._config.closeProfileButtonSelector);
    this._popupProfileForm = new FormValidate(validateConfig, this._config.popupFormSelector).enableValidate();
    this._setEventListeners();
  }

}

const profilePopup = new PopupProfile(popupProfileConfig, '.popup_type_profile').enablePopup();

// function checkKeypressEsc (evt) {
//   if (evt.key === 'Escape') {
//     closePopup(document.querySelector('.popup_opened')); //на странице только 1 popup_opened
//   }
// }

// function closePopup (popup) {
//   popup.classList.remove('popup_opened'); /*закрыть попап*/
//   document.removeEventListener('keydown', checkKeypressEsc);
// }
//
// function openPopup (popup) {
//   popup.classList.add('popup_opened'); /*вывод попапа*/
//   document.addEventListener('keydown', checkKeypressEsc);
// }
//
// function preloadProfileData () {
//   popupProfileInputName.value = popupProfileName.textContent; /*присваивание имени*/
//   popupProfileInputOccupation.value = popupProfileOccupation.textContent; /*присваивание брифа*/
// }
//
// function openPopupProfile () {
//   preloadProfileData();
//   openPopup(popupProfile);
// }
//
// function handleProfileEditSubmit (evt) {
//   evt.preventDefault();
//   popupProfileName.textContent = popupProfileInputName.value; /*Замена имени*/
//   popupProfileOccupation.textContent = popupProfileInputOccupation.value; /*Замена брифа*/
//   closePopup(popupProfile);
// }

function handleCardAddSubmit (evt) {
  evt.preventDefault();
  const card = new MakeCard(popupCardInputImageCaption.value, popupCardInputImageSrc.value, '#photo-grid__template', cardConfig)
  photoGridSection.prepend(card.generateCard()); // add content in html
  closePopup(popupCardContainer);
  popupCardForm.reset();
}

function preloadImages () {
  initialCards.forEach(function (elem) {
    const card = new MakeCard(elem.name, elem.link, '#photo-grid__template', cardConfig);
    photoGridSection.prepend(card.generateCard()); //add content in html
  });
}

// function getListenerPopupOverlay () {
//   const popupList = Array.from(document.querySelectorAll('.popup')); //Нашли все попапы
//   popupList.forEach((popupElement) => {
//     const popupOverlay = popupElement.querySelector('.popup__overlay'); //Для каждого попапа нашли свой overlay
//     popupOverlay.addEventListener('click', () => closePopup(popupElement)); //добавили прослушку
//   })
// }

preloadImages();
// getListenerPopupOverlay();
// preloadProfileData();
// popupProfileOpenButton.addEventListener('click', openPopupProfile);
// popupProfileCloseButton.addEventListener('click', () => closePopup(popupProfile));
// popupProfileForm.addEventListener('submit', handleProfileEditSubmit);//popup редактирования профиля
popupCardOpenButton.addEventListener('click', () => openPopup(popupCardContainer));
popupCardCloseButton.addEventListener('click', () => closePopup(popupCardContainer));
popupCardForm.addEventListener('submit', handleCardAddSubmit);//popup добавления контента
imagePopupCloseButton.addEventListener('click', () => closePopup(imagePopupContainer));

const popupCardFormValidate = new FormValidate(validateConfig, '.popup__form_type_add-content').enableValidate();
// const popupProfileFormValidate = new FormValidate(validateConfig, '.popup__form_type_edit-profile').enableValidate();