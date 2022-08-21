import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.popup__form');
  }
  
  _getInputValues () {
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._inputValues = {};
    this._inputList.forEach((elem) => {
      this._inputValues[elem.name] = elem.value;
    });

    return this._inputValues;
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {this._handleSubmitForm(evt, this._getInputValues())});
  }

  close() {
    super.close();
    this._form.reset();
  }

}