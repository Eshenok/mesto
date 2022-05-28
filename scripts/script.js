'use strict'

let editButton = document.querySelector('.edit-button');
let popupSaveButton = document.querySelector('.popup__save-button');
let popupCloseButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');

editButton.addEventListener('click', function() { 
    let profileName = document.querySelector('.profile__name');
    let profileBrief = document.querySelector('.profile__brief');
    let profileInputName = document.querySelector('.popup__input-name');
    let profileInputBrief = document.querySelector('.popup__input-brief'); 
    popup.classList.add('popup_opened'); /*вывод попапа*/
    profileInputName.value = profileName.textContent; /*присваивание имени*/
    profileInputBrief.value = profileBrief.textContent; /*присваивание брифа*/
});

popupCloseButton.addEventListener('click', function() { 
    popup.classList.remove('popup_opened'); /*закрыть попап*/
});

popupSaveButton.addEventListener('click', function() {
    let profileName = document.querySelector('.profile__name');
    let profileBrief = document.querySelector('.profile__brief');
    let profileInputName = document.querySelector('.popup__input-name');
    let profileInputBrief = document.querySelector('.popup__input-brief');
    profileName.textContent = profileInputName.value; /*Замена имени*/
    profileBrief.textContent = profileInputBrief.value; /*Замена брифа*/
    popup.classList.remove('popup_opened');
});