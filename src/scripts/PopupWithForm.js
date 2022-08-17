import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.popup__form');
  }
  
  getInputValues () {
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._inputValues = {};
    this._inputList.forEach((elem) => {
      this._inputValues[elem.name] = elem.value;
    });
    // oldKeysArray.forEach((oldKey, index) => {
    //   this._renameKey(this._inputValues, oldKey, newKeysArray[index]);
    // });
    return this._inputValues;
  }
  
  // _renameKey (obj, oldKey, newKey) { //функция переименования ключей
  //   if (oldKey !== newKey) { //проверяет ключ
  //     Object.defineProperty(obj, newKey,
  //       Object.getOwnPropertyDescriptor(obj, oldKey)); // заменяем на новый
  //     delete obj[oldKey]; // удаляем старый
  //   }
  // }
  
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {this._handleSubmitForm(evt)});
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }

}