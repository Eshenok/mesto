'use strict'

class MakeCard {
  constructor(cardConfig, popup, buttons) {
  this._imageCaption = cardConfig.imageCaption;
  this._imageSrc = cardConfig.imageSrc;
  this._popup = popup;
  this._buttons = buttons;
  }

  _getTemplate () {
    const cardElement = document.querySelector(`#photo-grid__template`).content.cloneNode(true); //нашли template и скопировали его
    return cardElement; //вернули для дальнейшего использования
  }

  _setEventListeners () { //function добавления прослушки
    this._cardImage.addEventListener('click', function () {
      this._popup.image.src = cardImage.src;
      this._popup.image.alt = cardImage.alt;
      this._popup.caption.textContent = this._popup.image.alt;
      openPopup(this._popup.container);
    });

    this._buttons.like.addEventListener('click', function () { // like
      this._buttons.like.classList.toggle('button_icon_like-active');
    });

    this._buttons.delete.addEventListener('click', function () {
      this._buttons.delete.closest('.photo-grid__item').remove();
    });
  }

  generateCard () {
    this._cardElement = this._getTemplate(); //получили шаблон карточки

    this._cardImage = this._cardElement.querySelector('.photo-grid__image'); //Нашли image карточки
    this._cardElement.querySelector('.photo-grid__caption').textContent = this._imageCaption; //caption
    this._cardImage.src = this._imageSrc; // src
    this._cardImage.alt = this._imageCaption; // alt
    this._setEventListeners(); //добавили прослушку в карточку
    return this._cardElement; //возвращаем элемент для вставки в DOM
  }
}

const NEW = new MakeCard({s: 1, s1: 2,}, {pop: 1, pop2: 2}, {but: 1, but1: 2});
const newGen = NEW.generateCard();
console.log(newGen);