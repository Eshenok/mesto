
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }
  
  _checkKeypressEsc (evt) {
    if (evt.key === 'Escape') {
      this.closePopup(document.querySelector('.popup_opened'));
    }
  }
  
  closePopup () {
    this._popup.classList.remove('popup_opened');
  }
  
  openPopup () {
    this._popup.classList.add('popup_opened');
  }
  
  setEventListeners () {
    this._popup.querySelector('.button_icon_close').addEventListener('click', () => {this.closePopup()});
    this._popup.querySelector('.popup__overlay').addEventListener('click', () => {this.closePopup()});
    document.addEventListener('keydown', (evt) => {this._checkKeypressEsc(evt)});
  }
}