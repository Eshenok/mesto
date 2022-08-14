/*
* Валидация формы
* Прнимает на вход config с селекторами для работы форм и селектор текущей формы.
 */

export default class FormValidate {
  constructor(config, formSelector) {
    this._config = config;
    this._formElement = document.querySelector(formSelector);
  }
  
  _checkValidate (inputElement) {
    if (!inputElement.validity.valid) {
      this._showErrorMessage(inputElement, inputElement.validationMessage);//Если не прошел проверку, то покажет message
    } else {
      this._hideErrorMessage(inputElement); //Спрятать сообщение об ошибке
    }
    this.switchButtonState();
  }
  
  _showErrorMessage (inputElement, errorMessage) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);//нашли все span для вывода текста ошибки.
    this._errorElement.textContent = errorMessage; // Дали span'у текст ошибки
    inputElement.classList.add(this._config.inputErrorClass); //дали border для input'a
    this._errorElement.classList.add(this._config.errorClass); //display: block для span
  }

  _hideErrorMessage (inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);//нашли все span для вывода текста ошибки.
    this._errorElement.textContent = ' '; // Дали span'у текст ошибки
    inputElement.classList.remove(this._config.inputErrorClass); //дали border для input'a
    this._errorElement.classList.remove(this._config.errorClass); //display: block для span
  }

  _setEventListeners () {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkValidate(inputElement);
      });
    });
  }
  
  _checkValidateForm () {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    });
  }
  
  switchButtonState () {
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    if (this._checkValidateForm()) {
      this._buttonElement.setAttribute('disabled', '');
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
  }

  enableValidate () {
    this._setEventListeners();
    this.switchButtonState();
  }

}