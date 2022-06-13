'use strict'

const editPopupContainer = document.querySelector('.popup_type_profile');
const editPopupCloseButton = document.querySelector('.button_close_profile');
const editPopupProfileForm = document.querySelector('.popup__form_type_edit-profile');
const editPopupOpenButton = document.querySelector('.button_icon_edit');
const editPopupProfileName = document.querySelector('.profile__name');
const editPopupProfileOccupation = document.querySelector('.profile__occupation');
const editPopupInputName = document.querySelector('.popup__input_type_name');
const editPopupInputOccupation = document.querySelector('.popup__input_type_occupation'); //popup редактирования профиля
const addPopupContainer = document.querySelector('.popup_type_card');
const addPopupButtonClose = document.querySelector('.button_close_card');
const addPopupOpenButton = document.querySelector('.button_icon_add');
const addPopupImageCaption = document.querySelector('.popup__input_type_image-caption');
const addPopupImageSrc = document.querySelector('.popup__input_type_image-src');
const addPopupForm = document.querySelector('.popup__form_type_add-content');// popup Добавления контента
const imagePopupContainer = document.querySelector('.popup_type_image');//popup картинки
const imagePopupCloseButton = document.querySelector('.button_close_image');
const photoGridSection = document.querySelector('.photo-grid');
const cardTemplate = document.querySelector('#photo-grid__template');// template
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function closePopup(popup) {
  popup.classList.remove('popup_opened'); /*закрыть попап*/
}

function openPopup (popup) {
  popup.classList.add('popup_opened'); /*вывод попапа*/
}

function openPopupProfile () {
  editPopupInputName.value = editPopupProfileName.textContent; /*присваивание имени*/
  editPopupInputOccupation.value = editPopupProfileOccupation.textContent; /*присваивание брифа*/
  openPopup(editPopupContainer);
}

function handleProfileEditSubmit (evt) {
  evt.preventDefault(); 
  editPopupProfileName.textContent = editPopupInputName.value; /*Замена имени*/
  editPopupProfileOccupation.textContent = editPopupInputOccupation.value; /*Замена брифа*/
  closePopup(editPopupContainer);
}

function makeCard (cardImageSource, cardCaptionSource) {
  const card = cardTemplate.content.cloneNode(true); //clone template
  const cardImage = card.querySelector('.photo-grid__image');
  const likeButton = card.querySelector('.button_icon_like');
  const deleteButton = card.querySelector('.button_icon_delete');
  const imagePopup = imagePopupContainer.querySelector('.popup__image');
  const captionPopup = imagePopupContainer.querySelector('.popup__caption');
  card.querySelector('.photo-grid__caption').textContent = cardCaptionSource; //caption
  cardImage.src = cardImageSource; // src
  cardImage.alt = cardCaptionSource; // alt
  cardImage.addEventListener('click', function () {
    imagePopup.src = cardImage.src;
    captionPopup.textContent = cardImage.alt;
    imagePopupContainer.classList.add('popup_opened');
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
  const card = makeCard(addPopupImageSrc.value, addPopupImageCaption.value)
  photoGridSection.prepend(card); // add content in html
  closePopup(addPopupContainer);
  addPopupForm.reset();
}

function preloadImages () {
  initialCards.forEach(function (elem) { //for(i = 0; i < initialCards.lenghth; i++)
    const card = makeCard(elem.link, elem.name);
    photoGridSection.prepend(card); //add content in html
  });
}

preloadImages();
editPopupOpenButton.addEventListener('click', openPopupProfile);
editPopupCloseButton.addEventListener('click', () => {closePopup(editPopupContainer)});
editPopupProfileForm.addEventListener('submit', handleProfileEditSubmit);//popup редактирования профиля
addPopupOpenButton.addEventListener('click', () => {openPopup(addPopupContainer)});
addPopupButtonClose.addEventListener('click', () => {closePopup(addPopupContainer)});
addPopupForm.addEventListener('submit', handleCardAddSubmit);//popup добавления контента
imagePopupCloseButton.addEventListener('click', () => {closePopup(imagePopupContainer)})