/*
* Работа попапов.
* Принимает на вход Общий для работы всех попапов конфиг, Селектор необходимого попапа и Конфиг каждого попапа
* имеет 4 прослушки, 2 общие, 2 уникальные для каждого дочернего класса
 */

import { initialCards, cardConfig, validateConfig } from "./config.js";
import { FormValidate } from './FormValidator.js';
import { MakeCard } from "./Сard.js";

class Popup {
  constructor(commonPopupConfig, popupSelector) {
    this._commonConfig = commonPopupConfig;
    this._popup = document.querySelector(popupSelector);
    this._popupOverlayList = Array.from(document.querySelectorAll(this._commonConfig.popupOverlaySelector)); //нашли overlay
    this._popupCloseButtonList = Array.from(document.querySelectorAll(this._commonConfig.closePopupButtonSelector));
    this._popupForm = this._popup.querySelector(this._commonConfig.popupFormSelector);
  }
  
  _checkKeypressEsc (evt) {
    if (evt.key === 'Escape') {
      this._closePopup(document.querySelector(`.${this._commonConfig.popupOpenedClass}`));
    }
  }
  
  _closePopup (popup) {
    popup.classList.remove(this._commonConfig.popupOpenedClass);
  }
  
  _openPopup (popup) {
    popup.classList.add(this._commonConfig.popupOpenedClass);
  }
  
  enableHandleClosePopups () {
    this._popupOverlayList.forEach((elem) => {
      elem.addEventListener('click', () => {this._closePopup(document.querySelector(`.${this._commonConfig.popupOpenedClass}`))});
    });
    this._popupCloseButtonList.forEach((elem) => {
      elem.addEventListener('click', () => {this._closePopup(document.querySelector(`.${this._commonConfig.popupOpenedClass}`))});
    })
    document.addEventListener('keydown', (evt) => {this._checkKeypressEsc(evt)});
  }
}

class PopupProfile extends Popup {
  constructor(commonPopupConfig, popupSelector, profileConfig) {
    super(commonPopupConfig, popupSelector);
    this._config = profileConfig;
  }
  
  _preloadProfileData () {
    this._popupProfileInputName.value = this._profileName.textContent; /*присваивание имени*/
    this._popupProfileInputOccupation.value = this._profileOccupation.textContent; /*присваивание брифа*/
  }
  
  _openProfilePopup () {
    this._preloadProfileData();
    this._openPopup(this._popup);
    this._popupValidate.switchButtonState();
  }
  
  _handleProfileEditSubmit (evt) {
    evt.preventDefault();
    this._profileName.textContent = this._popupProfileInputName.value; /*Замена имени*/
    this._profileOccupation.textContent = this._popupProfileInputOccupation.value; /*Замена брифа*/
    this._closePopup(this._popup);
  }
  
  _setEventListeners () {
    this._popupProfileOpenButton.addEventListener('click', () => this._openProfilePopup()); // openPopup
    this._popupForm.addEventListener('submit', (evt) => {this._handleProfileEditSubmit(evt)});
  }
  
  enablePopup () {
    this._popupValidate = new FormValidate(validateConfig, this._config.profileFormSelector);
    this._popupProfileInputName = this._popup.querySelector(this._config.popupInputNameSelector); // input изменения имени
    this._popupProfileInputOccupation = this._popup.querySelector(this._config.popupInputOccupationSelector); // input изменения профессии
    this._profileName = document.querySelector(this._config.profileNameSelector); // Имя профиля
    this._profileOccupation = document.querySelector(this._config.profileOccupationSelector); // Профессия профиля
    this._popupProfileOpenButton = document.querySelector(this._config.openProfileButtonSelector);
    this._setEventListeners();
    this._popupValidate.enableValidate();
  }
  
}

class PopupCard extends Popup {
  constructor(commonPopupConfig, popupSelector, cardConfig) {
    super(commonPopupConfig, popupSelector);
    this._config = cardConfig;
  }
  
  _handleCardAddSubmit (evt) {
    evt.preventDefault();
    this._card = new MakeCard(this._popupCardInputImageCaption.value, this._popupCardInputImageSrc.value, '#photo-grid__template', cardConfig);
    this._photoGridSection.prepend(this._card.generateCard()); // add content in html
    this._closePopup(this._popup);
    this._popupForm.reset();
    this._popupValidate.switchButtonState();
  }
  
  _preloadImages () {
    initialCards.forEach((elem) => {
      this._card = new MakeCard(elem.name, elem.link, '#photo-grid__template', cardConfig);
      this._photoGridSection.prepend(this._card.generateCard()); //add content in html
    });
  }
  
  _setEventListeners() {
    this._popupCardOpenButton.addEventListener('click', () => {this._openPopup(this._popup)});
    this._popupForm.addEventListener('submit', (evt) => {this._handleCardAddSubmit(evt)});
  }
  
  enablePopup () {
    this._popupValidate = new FormValidate(validateConfig, this._config.cardFormSelector);
    this._cardImage =
      this._photoGridSection = document.querySelector(this._config.cardSectionSelector);
    this._popupCardOpenButton = document.querySelector(this._config.openCardPopupButtonSelector);
    this._popupCardInputImageCaption = this._popup.querySelector(this._config.popupInputCaptionSelector);
    this._popupCardInputImageSrc = this._popup.querySelector(this._config.popupInputSrcSelector);
    this._preloadImages();
    this._setEventListeners();
    this._popupValidate.enableValidate();
  }
}

export { Popup, PopupCard, PopupProfile };