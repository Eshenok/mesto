
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }
  
  _checkKeypressEsc (evt) {
    if (evt.key === 'Escape') {
      this.closePopup(document.querySelector('.popup_opened'));
    }
  }
  
  closePopup (popup) {
    popup.classList.remove('popup_opened');
  }
  
  openPopup (popup) {
    popup.classList.add('popup_opened');
  }
  
  setEventListeners () {
    this._popup.querySelector('.button_icon_close').addEventListener('click', () => {closePopup(this._popup)});
    this._popup.querySelector('.popup__overlay').addEventListener('click', () => {closePopup(this._popup)});
    document.addEventListener('keydown', (evt) => {this._checkKeypressEsc(evt)});
  }
}