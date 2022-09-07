import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._buttonSubmit = this._form.querySelector('.button_theme_dark');
    this._buttonSubmitText = this._buttonSubmit.textContent;
  }
  
  _getInputValues () {
    this._inputValues = {};
    this._inputList.forEach((elem) => {
      this._inputValues[elem.name] = elem.value;
    });

    return this._inputValues;
  }
  
  renderLoading (isLoading, loadingText) {
    if (isLoading) {
      this._buttonSubmit.textContent = loadingText;
    } else {
      this._buttonSubmit.textContent = this._buttonSubmitText;
    }
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues())
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

}