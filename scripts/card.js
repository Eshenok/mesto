'use strict'

import {cardConfig} from "./initialCard.js";

class MakeCard {
  constructor(imageCaption, imageSrc, templateId) {
  this._imageCaption = imageCaption;
  this._imageSrc = imageSrc;
  this._templateId = templateId;
  }

  _getTemplate () {
    const cardElement = document.querySelector(this._templateId).content.cloneNode(true); //нашли template и скопировали его
    return cardElement; //вернули для дальнейшего использования
  }
  
  _handleLikeButton () {
    this._likeButton.classList.toggle(cardConfig.buttonLikeActiveClass);
  }
  
  _handleDelButton () {
    this._delButton.closest('.photo-grid__item').remove();
  }
  
  _setEventListeners () { //function добавления прослушки
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButton();
    });
    
    this._delButton.addEventListener('click', () => { // удаление карточки
      this._handleDelButton();
    });
  
    this._cardImage.addEventListener('click', () => { //открытие попапа
      this._popupImage.src = this._cardImage.src;
      this._popupImage.alt = this._cardImage.alt;
      this._popupContainer.querySelector(cardConfig.captionPopupSelector).textContent = this._cardImage.alt;
      this._popupContainer.classList.add('popup_opened');
    });
  }

  generateCard () {
    this._cardElement = this._getTemplate(); //получили шаблон карточки
    this._cardImage = this._cardElement.querySelector('.photo-grid__image'); //Нашли image карточки
    this._cardElement.querySelector('.photo-grid__caption').textContent = this._imageCaption; //caption
    this._cardImage.src = this._imageSrc; // src
    this._cardImage.alt = this._imageCaption; // alt
    this._likeButton = this._cardElement.querySelector(cardConfig.buttonLikeSelector); //Нашли кнопку like
    this._delButton = this._cardElement.querySelector(cardConfig.buttonDelSelector); //Нашли кнопку удаления
    this._popupContainer = document.querySelector(cardConfig.imagePopupContainerSelector); //нашли попап
    this._popupImage = this._popupContainer.querySelector(cardConfig.imagePopupSelector); //нашли картинку попапа
    this._setEventListeners(); //добавили прослушку в карточку
    
    return this._cardElement; //возвращаем элемент для вставки в DOM
  }
}

export { MakeCard };