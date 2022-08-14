import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.popup__form');
  }
  
  _getInputValues () {
    this._inputList = this._form.queruSelectorAll('.popup__input');
    this._inputValues = {};
    this._inputList.forEach((elem) => {
      this._inputValues[elem.name] = elem.name.value;
    });
    return this._inputValues;
  }
  
  setEventListeners() {
    super.setEventListeners();
  }
  
  closePopup(popup) {
    super.closePopup(popup);
  }
  
}