'use strict'

class MakeCard {
  constructor(imageCaption, imageSrc, cardConfig) {
  this._imageCaption = imageCaption;
  this._imageSrc = imageSrc;
  this._cardConfig = cardConfig;
  }

  _getTemplate () {
    const cardElement = document.querySelector(`#photo-grid__template`).content.cloneNode(true); //нашли template и скопировали его
    return cardElement; //вернули для дальнейшего использования
  }

  _setEventListeners (src, caption) { //function добавления прослушки
    this._popupContainer = document.querySelector(this._cardConfig.imagePopupContainerSelector); //нашли Попап
    this._imagePopup = this._popupContainer.querySelector(this._cardConfig.imagePopupSelector); //нашли изображение в попапе
    this._captionPopup = this._popupContainer.querySelector(this._cardConfig.captionPopupSelector); //caption попапа
    this._cardImage.addEventListener('click', function () { // открытие попапа по клику
      this._imagePopup.src = src;
      this._imagePopup.alt = caption;
      this._captionPopup.textContent = this._imagePopup.alt;
      openPopup(this._popupContainer);
    });
    
    const likeButton = this._cardElement.querySelector(this._cardConfig.buttonLikeSelector);
    likeButton.addEventListener('click', function () { // like
      likeButton.classList.toggle('button_icon_like-active');
    });
    
    const delButton = this._cardElement.querySelector(this._cardConfig.buttonDelSelector);
    delButton.addEventListener('click', function () {
      delButton.closest('.photo-grid__item').remove();
    });
  }

  generateCard () {
    this._cardElement = this._getTemplate(); //получили шаблон карточки
    this._cardImage = this._cardElement.querySelector('.photo-grid__image'); //Нашли image карточки
    this._cardElement.querySelector('.photo-grid__caption').textContent = this._imageCaption; //caption
    this._cardImage.src = this._imageSrc; // src
    this._cardImage.alt = this._imageCaption; // alt
    this._setEventListeners(this._imageSrc, this._imageCaption); //добавили прослушку в карточку
    return this._cardElement; //возвращаем элемент для вставки в DOM
  }
}

export { MakeCard };