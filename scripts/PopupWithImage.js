import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({name, link}, popupSelector) {
    super(popupSelector);
    this._link = link;
    this._name = name;
  }
  
  openPopup(popup) {
    super.openPopup(popup);
    this._popup.querySelector('.popup__image').setAttribute('src', this._link);
    this._popup.querySelector('.popup__caption').textContent = this._name;
  }
}