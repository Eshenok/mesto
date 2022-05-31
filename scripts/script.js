'use strict'

const editButton = document.querySelector('.button_icon_edit');
const popupCloseButton = document.querySelector('.button_icon_close');
const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileOccupation = document.querySelector('.profile__occupation');
let popupInputName = document.querySelector('.popup__input_type_name');
let popupInputOccupation = document.querySelector('.popup__input_type_occupation'); 

function closePopup() {
  popup.classList.remove('popup_opened'); /*закрыть попап*/
}

function openPopup() {
  popup.classList.add('popup_opened'); /*вывод попапа*/
  popupInputName.value = profileName.textContent; /*присваивание имени*/
  popupInputOccupation.value = profileOccupation.textContent; /*присваивание брифа*/
}

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  profileName.textContent = popupInputName.value; /*Замена имени*/
  profileOccupation.textContent = popupInputOccupation.value; /*Замена брифа*/
  closePopup();
}

editButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', formSubmitHandler);