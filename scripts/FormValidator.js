/*
* Валидация формы
* Прнимает на вход config с селекторами для работы форм и селектор текущей формы.
 */

class FormValidate {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = document.querySelector(formElement);
  }
  
  _checkValidate (inputElement) {
    if (!inputElement.validity.valid) {
      this._showErrorMessage(inputElement, inputElement.validationMessage);//Если не прошел проверку, то покажет message
    } else {
      this._hideErrorMessage(inputElement); //Спрятать сообщение об ошибке
    }
    this._switchButtonState();
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
  
  _switchButtonState () {
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
    this._switchButtonState();
  }

}

export {FormValidate};

/*
function showErrorMessage(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);//нашли все span для вывода текста ошибки.
  errorElement.textContent = errorMessage; // Дали span'у текст ошибки
  inputElement.classList.add(config.inputErrorClass); //дали border для input'a
  errorElement.classList.add(config.errorClass); //display: block для span
}

function hideErrorMessage(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); //Нашли span
  errorElement.textContent = ' ';
  inputElement.classList.remove(config.inputErrorClass); //забрали border для input'a
  errorElement.classList.remove(config.errorClass); //display: none для span
}

function checkValidate(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showErrorMessage(formElement, inputElement, inputElement.validationMessage, config);//Если не прошел проверку, то покажет message
  } else {
    hideErrorMessage(formElement, inputElement, config); //Спрятать сообщение об ошибке
  }
  switchButtonStatus(formElement, config);
}

function getListener(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));//Нашли все input для каждой формы отдельно.
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkValidate(formElement, inputElement, config); //добавим в прослушку проверку на валидность при вводе для каждого input;
    });
  })
}

function checkValidateForm(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  });
}

function switchButtonStatus(formElement, config) {
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  if (checkValidateForm(formElement, config)) {
    buttonElement.setAttribute('disabled', '');
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}

function enableValidate(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));//Нашли все формы
  formList.forEach((formElement) => { //обходим все формы
    formElement.addEventListener('submit', (evt) => { //добавим прослушку для форм
      evt.preventDefault();//отключили для форм Default
    });
    getListener(formElement, config);//Добавляем прослушки input в формы.
    switchButtonStatus(formElement, config);
  });
}

enableValidate(config);

export { switchButtonStatus, config };
//Корневой formElement лежит в enableValidate
//Корневой inputElement лежит в getEventListener
*/