
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handlerKeypressEsc = this._checkKeypressEsc.bind(this);
  }
  
  _checkKeypressEsc (evt) {
    if (evt.key === 'Escape') {
      this.close(document.querySelector('.popup_opened'));
    }
  }
  
  close () {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handlerKeypressEsc);
  }
  
  open () {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handlerKeypressEsc);
  }
  
  setEventListeners () {
    this._popup.querySelector('.button_icon_close').addEventListener('click', () => {this.close()});
    this._popup.querySelector('.popup__overlay').addEventListener('click', () => {this.close()});
  }
}