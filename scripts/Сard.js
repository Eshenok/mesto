/*
* Создание карточки.
* Принимает на вход Описание картинки, ссылку на картинку и ID макета карточки
* имеет 3 прослушки: Кнопка like, кнопка delete, открытие попапа по нажатию на изображение
 */

export default class MakeCard {
    constructor(data, templateId, cardConfig, handleImageClick) {
      this._data = data;
      this._templateId = templateId;
      this._config = cardConfig;
      this._handleImageClick = handleImageClick;
    }
    _getTemplate () {
      const cardElement = document.querySelector(this._templateId).content.cloneNode(true); //нашли template и скопировали его
      return cardElement; //вернули для дальнейшего использования
    }

    _handleLikeButton () {
      this._likeButton.classList.toggle(this._config.buttonLikeActiveClass);
    }

    _handleDelButton () {
      const cardSelector = this._config.cardItemSelector;
      this._delButton.closest(cardSelector).remove();
      this._delButton = null;
    }

    _setEventListeners () { //function добавления прослушки
      this._likeButton.addEventListener('click', () => {
        this._handleLikeButton();
      });

      this._delButton.addEventListener('click', () => { // удаление карточки
        this._handleDelButton();
      });

      this._cardImage.addEventListener('click', () => { //открытие попапа
        this._handleImageClick(this._data);
      });
    }

    generateCard () {
      this._cardElement = this._getTemplate(); //получили шаблон карточки
      this._cardImage = this._cardElement.querySelector(this._config.cardImageSelector); //Нашли image карточки
      this._cardElement.querySelector(this._config.cardCaptionSelector).textContent = this._data.name; //caption
      this._cardImage.src = this._data.link; // src
      this._cardImage.alt = this._data.name; // alt
      this._likeButton = this._cardElement.querySelector(this._config.buttonLikeSelector); //Нашли кнопку like
      this._delButton = this._cardElement.querySelector(this._config.buttonDelSelector); //Нашли кнопку удаления
      this._setEventListeners(); //добавили прослушку в карточку

      return this._cardElement; //возвращаем элемент для вставки в DOM
    }
  }