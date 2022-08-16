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

const validateConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.button',
  inactiveButtonClass: 'button_type_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-span-error_active',
}

const cardConfig = {
  buttonLikeSelector: '.button_icon_like',
  buttonDelSelector: '.button_icon_delete',
  buttonClosePopupSelector: '.button_close_image',
  imagePopupContainerSelector: '.popup_type_image',
  imagePopupSelector: '.popup__image',
  captionPopupSelector: '.popup__caption',
  cardItemSelector: '.photo-grid__item',
  cardImageSelector: '.photo-grid__image',
  cardCaptionSelector: '.photo-grid__caption',
  buttonLikeActiveClass: 'button_icon_like-active',
  popupOpenedClass: 'popup_opened',
}

const profileOpenButton = document.querySelector('.button_icon_edit');
const cardOpenButton = document.querySelector('.button_icon_add');

export {initialCards, validateConfig, cardConfig, profileOpenButton, cardOpenButton};