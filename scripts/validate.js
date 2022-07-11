'use strict'

function showErrorMessage(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);//нашли все span для вывода текста ошибки.
  errorElement.textContent = errorMessage; // Дали span'у текст ошибки
  inputElement.classList.add('popup__input-error'); //дали border для input'a
  errorElement.classList.add('popup__input-span-error_active'); //display: block для span
}

function hideErrorMessage(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); //Нашли span
  errorElement.textContent = ' ';
  inputElement.classList.remove('popup__input-error'); //забрали border для input'a
  errorElement.classList.remove('popup__input-span-error_active'); //display: none для span
}

function checkValidate(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showErrorMessage(formElement, inputElement, inputElement.validationMessage);//Если не прошел проверку, то покажет message
  } else {
    hideErrorMessage(formElement, inputElement); //Спрятать сообщение об ошибке
  }
  switchButtonStatus(formElement);
}

function getListener(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));//Нашли все input для каждой формы отдельно.
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkValidate(formElement, inputElement); //добавим в прослушку проверку на валидность при вводе для каждого input;
    });
  })
}

function checkValidateForm(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  let inputStatus = false;
  for(let i =0; i<inputList.length;i++) {
    if (!inputList[i].validity.valid) {
      inputStatus = false;
      break;
    } else {
      inputStatus = true;
    }
  }
  return inputStatus;
}

function switchButtonStatus(formElement) {
  const buttonElement = formElement.querySelector('.button');
  if (!checkValidateForm(formElement)) {
    buttonElement.setAttribute('disabled', '');
    buttonElement.classList.add('button_type_disabled');
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove('button_type_disabled');
  }
}

function enableValidate() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));//Нашли все формы
  formList.forEach((formElement) => { //обходим все формы
    formElement.addEventListener('submit', (evt) => { //добавим прослушку для форм
      evt.preventDefault();//отключили для форм Default
    });
    getListener(formElement);//Добавляем прослушки input в формы.
    switchButtonStatus(formElement);
  });
}

enableValidate();

//Корневой formElement лежит в enableValidate
//Корневой inputElement лежит в getEventListener
