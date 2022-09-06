import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  
  open(data) {
    super.open();
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupImage.setAttribute('src', data.link);
    this._popupImage.setAttribute('alt', data.name);
    this._popup.querySelector('.popup__caption').textContent = data.name;
  }
}