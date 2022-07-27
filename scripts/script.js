'use strict'

import { switchButtonStatus, config } from './FormValidator.js';
import { initialCards, cardConfig } from "./initialCard.js";
import { MakeCard } from "./card.js";

const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileCloseButton = document.querySelector('.button_close_profile');
const popupProfileForm = document.querySelector('.popup__form_type_edit-profile');
const popupProfileOpenButton = document.querySelector('.button_icon_edit');
const popupProfileName = document.querySelector('.profile__name');
const popupProfileOccupation = document.querySelector('.profile__occupation');
const popupProfileInputName = document.querySelector('.popup__input_type_name');
const popupProfileInputOccupation = document.querySelector('.popup__input_type_occupation'); //popup редактирования профиля
const popupCardContainer = document.querySelector('.popup_type_card');
const popupCardCloseButton = document.querySelector('.button_close_card');
const popupCardOpenButton = document.querySelector('.button_icon_add');
const popupCardInputImageCaption = document.querySelector('.popup__input_type_image-caption');
const popupCardInputImageSrc = document.querySelector('.popup__input_type_image-src');
const popupCardForm = document.querySelector('.popup__form_type_add-content');// popup Добавления контента
const imagePopupContainer = document.querySelector('.popup_type_image');//popup картинки
const imagePopupCloseButton = document.querySelector('.button_close_image');
const imagePopup = imagePopupContainer.querySelector('.popup__image');// поиск картинки для popup Image
const captionPopup = imagePopupContainer.querySelector('.popup__caption'); // поиск подписи для popup Image
const photoGridSection = document.querySelector('.photo-grid');
const cardTemplate = document.querySelector('#photo-grid__template');// template

function checkKeypressEsc (evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened')); //на странице только 1 popup_opened
  }
}

function closePopup (popup) {
  popup.classList.remove('popup_opened'); /*закрыть попап*/
  document.removeEventListener('keydown', checkKeypressEsc);
}

function openPopup (popup) {
  popup.classList.add('popup_opened'); /*вывод попапа*/
  document.addEventListener('keydown', checkKeypressEsc);
}

function preloadProfileData () {
  popupProfileInputName.value = popupProfileName.textContent; /*присваивание имени*/
  popupProfileInputOccupation.value = popupProfileOccupation.textContent; /*присваивание брифа*/
}

function openPopupProfile () {
  preloadProfileData();
  openPopup(popupProfile);
  switchButtonStatus(popupProfileForm, config);
}

function handleProfileEditSubmit (evt) {
  evt.preventDefault(); 
  popupProfileName.textContent = popupProfileInputName.value; /*Замена имени*/
  popupProfileOccupation.textContent = popupProfileInputOccupation.value; /*Замена брифа*/
  closePopup(popupProfile);
}

function makeCard (cardImageSource, cardCaptionSource) {
  const card = cardTemplate.content.cloneNode(true); //clone template
  const cardImage = card.querySelector('.photo-grid__image');
  const likeButton = card.querySelector('.button_icon_like');
  const deleteButton = card.querySelector('.button_icon_delete');
  card.querySelector('.photo-grid__caption').textContent = cardCaptionSource; //caption
  cardImage.src = cardImageSource; // src
  cardImage.alt = cardCaptionSource; // alt
  cardImage.addEventListener('click', function () {
    imagePopup.src = cardImage.src;
    imagePopup.alt = cardImage.alt;
    captionPopup.textContent = cardImage.alt;
    openPopup(imagePopupContainer);
  });
  likeButton.addEventListener('click', function () { // like
    likeButton.classList.toggle('button_icon_like-active');
  });
  deleteButton.addEventListener('click', function () {
    deleteButton.closest('.photo-grid__item').remove();
  });
  return card;
}

function handleCardAddSubmit (evt) {
  evt.preventDefault();
  const card = new MakeCard(popupCardInputImageCaption.value, popupCardInputImageSrc.value, cardConfig);
  photoGridSection.prepend(card.generateCard()); // add content in html
  closePopup(popupCardContainer);
  popupCardForm.reset();
  switchButtonStatus(popupCardForm, config);
}

function preloadImages () {
  initialCards.forEach(function (elem) {
    const card = new MakeCard(elem.name, elem.link, cardConfig);
    photoGridSection.prepend(card.generateCard()); //add content in html
  });
}

function getListenerPopupOverlay () {
  const popupList = Array.from(document.querySelectorAll('.popup')); //Нашли все попапы
  popupList.forEach((popupElement) => {
    const popupOverlay = popupElement.querySelector('.popup__overlay'); //Для каждого попапа нашли свой overlay
    popupOverlay.addEventListener('click', () => closePopup(popupElement)); //добавили прослушку
  })
}

preloadImages();
getListenerPopupOverlay();
preloadProfileData();
popupProfileOpenButton.addEventListener('click', openPopupProfile);
popupProfileCloseButton.addEventListener('click', () => closePopup(popupProfile));
popupProfileForm.addEventListener('submit', handleProfileEditSubmit);//popup редактирования профиля
popupCardOpenButton.addEventListener('click', () => openPopup(popupCardContainer));
popupCardCloseButton.addEventListener('click', () => closePopup(popupCardContainer));
popupCardForm.addEventListener('submit', handleCardAddSubmit);//popup добавления контента
imagePopupCloseButton.addEventListener('click', () => closePopup(imagePopupContainer))