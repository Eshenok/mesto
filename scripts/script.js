'use strict'

const editPopupContainer = document.querySelector('.popup__edit-profile');
const editPopupCloseButton = document.querySelector('.button__edit-profile_close');
const editPopupProfileForm = document.querySelector('.popup__form_type_edit-profile');
const editPopupOpenButton = document.querySelector('.button_icon_edit');
const editPopupProfileName = document.querySelector('.profile__name');
const editPopupProfileOccupation = document.querySelector('.profile__occupation');
const editPopupInputName = document.querySelector('.popup__input_type_name');
const editPopupInputOccupation = document.querySelector('.popup__input_type_occupation'); //popup редактирования профиля


const addPopupContainer = document.querySelector('.popup__add-content');
const addPopupButtonClose = document.querySelector('.button__add-content_close');
const addPopupOpenButton = document.querySelector('.button_icon_add');
const addPopupImageCaption = document.querySelector('.popup__input_type_image-caption');
const addPopupImageSrc = document.querySelector('.popup__input_type_image-src');
const addPopupForm = document.querySelector('.popup__form_type_add-content');// popup Добавления контента
const popupPhotoGrid = document.querySelector('.popup__photo-grid');
const popupPhotoGridCloseButton = document.querySelector('.button__photo-grid_close');

const photoGridSection = document.querySelector('.photo-grid');
const photoGridTemplate = document.querySelector('#photo-grid__template');// template
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

function editProfileInfo () {
  openPopup(editPopupContainer);
  editPopupInputName.value = editPopupProfileName.textContent; /*присваивание имени*/
  editPopupInputOccupation.value = editPopupProfileOccupation.textContent; /*присваивание брифа*/
}

function editPopupFormSubmitHandler (evt) {
  evt.preventDefault(); 
  editPopupProfileName.textContent = editPopupInputName.value; /*Замена имени*/
  editPopupProfileOccupation.textContent = editPopupInputOccupation.value; /*Замена брифа*/
  closePopup(editPopupContainer);
}

function addPopupFormSubmitHandler (evt) {
  evt.preventDefault();
  const clonePhotoGrid = photoGridTemplate.content.cloneNode(true); //clone template
  clonePhotoGrid.querySelector('.photo-grid__caption').textContent = addPopupImageCaption.value; //caption
  clonePhotoGrid.querySelector('.photo-grid__image').setAttribute('src', addPopupImageSrc.value); // src
  clonePhotoGrid.querySelector('.photo-grid__image').setAttribute('alt', addPopupImageCaption.value); // alt
  clonePhotoGrid.querySelector('.photo-grid__image').addEventListener('click', function (evt) {
    popupPhotoGrid.querySelector('.popup__photo-grid_image').setAttribute('src', evt.target.getAttribute('src'));
    popupPhotoGrid.querySelector('.popup__photo-grid_caption').textContent = evt.target.getAttribute('alt');
    popupPhotoGrid.classList.add('popup_opened');
  });
  clonePhotoGrid.querySelector('.button_icon_like').addEventListener('click', function (evt) { // like
    evt.target.classList.toggle('button_icon_like-active');
  });
  clonePhotoGrid.querySelector('.button_icon_delete').addEventListener('click', function (evt) {
    evt.target.parentNode.remove();
  });
  photoGridSection.prepend(clonePhotoGrid); // add content in html
  closePopup(addPopupContainer);
}

function preloadImage () {
  initialCards.forEach(function (elem) { //for(i = 0; i < initialCards.lenghth; i++)
  const clonePhotoGrid = photoGridTemplate.content.cloneNode(true); //clone template
  clonePhotoGrid.querySelector('.photo-grid__caption').textContent = elem.name; // caption
  clonePhotoGrid.querySelector('.photo-grid__image').setAttribute('src', elem.link); //src
  clonePhotoGrid.querySelector('.photo-grid__image').setAttribute('alt', elem.name); //alt
  clonePhotoGrid.querySelector('.photo-grid__image').addEventListener('click', function (evt) {
    popupPhotoGrid.querySelector('.popup__photo-grid_image').setAttribute('src', evt.target.getAttribute('src'));
    popupPhotoGrid.querySelector('.popup__photo-grid_caption').textContent = evt.target.getAttribute('alt');
    popupPhotoGrid.classList.add('popup_opened');
  });
  clonePhotoGrid.querySelector('.button_icon_like').addEventListener('click', function (evt) { // like
    evt.target.classList.toggle('button_icon_like-active');
  });
  clonePhotoGrid.querySelector('.button_icon_delete').addEventListener('click', function (evt) {
    evt.target.parentNode.remove();
  });
  photoGridSection.prepend(clonePhotoGrid); //add content in html
  });
}

preloadImage();
editPopupOpenButton.addEventListener('click', editProfileInfo);
editPopupCloseButton.addEventListener('click', function () {closePopup(editPopupContainer)});
editPopupProfileForm.addEventListener('submit', editPopupFormSubmitHandler);//popup редактирования профиля

addPopupOpenButton.addEventListener('click', function () {openPopup(addPopupContainer)});
addPopupButtonClose.addEventListener('click', function () {closePopup(addPopupContainer)});
addPopupForm.addEventListener('submit', addPopupFormSubmitHandler);//popup добавления контента

popupPhotoGridCloseButton.addEventListener('click', function () {closePopup(popupPhotoGrid)})