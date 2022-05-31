'use strict'

let editButton = document.querySelector('.button_icon_edit');
let popupSaveButton = document.querySelector('.button_theme_dark');
let popupCloseButton = document.querySelector('.button_icon_close');
let popup = document.querySelector('.popup');

editButton.addEventListener('click', function() { 
    let profileName = document.querySelector('.profile__name');
    let profileOccupation = document.querySelector('.profile__occupation');
    let popupInputName = document.querySelector('.popup__input_type_name');
    let popupInputOccupation = document.querySelector('.popup__input_type_occupation'); 
    popup.classList.add('popup_opened'); /*вывод попапа*/
    popupInputName.value = profileName.textContent; /*присваивание имени*/
    popupInputOccupation.value = profileOccupation.textContent; /*присваивание брифа*/
});

popupCloseButton.addEventListener('click', function() { 
    popup.classList.remove('popup_opened'); /*закрыть попап*/
});

popupSaveButton.addEventListener('click', function() {
    let profileName = document.querySelector('.profile__name');
    let profileOccupation = document.querySelector('.profile__occupation');
    let popupInputName = document.querySelector('.popup__input_type_name');
    let popupInputOccupation = document.querySelector('.popup__input_type_occupation');
    profileName.textContent = popupInputName.value; /*Замена имени*/
    profileOccupation.textContent = popupInputOccupation.value; /*Замена брифа*/
    popup.classList.remove('popup_opened');
});