'use strict'

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

const commonPopupConfig = {
  popupOverlaySelector: '.popup__overlay',
  closePopupButtonSelector: '.button_icon_close',
  popupOpenedClass: 'popup_opened',
  popupFormSelector: '.popup__form',
}

const popupProfileConfig = {
  popupInputNameSelector: '.popup__input_type_name',
  profileOccupationSelector: '.profile__occupation',
  popupInputOccupationSelector: '.popup__input_type_occupation',
  profileNameSelector: '.profile__name',
  openProfileButtonSelector: '.button_icon_edit',
  profileFormSelector: '.popup__form_type_edit-profile',
}

const popupCardConfig = {
  cardSectionSelector: '.photo-grid',
  popupInputCaptionSelector: '.popup__input_type_image-caption',
  popupInputSrcSelector: '.popup__input_type_image-src',
  openCardPopupButtonSelector: '.button_icon_add',
  cardFormSelector: '.popup__form_type_add-content',
  cardImageSelector: '.photo-grid__image',
}

export { initialCards, validateConfig, cardConfig, commonPopupConfig, popupProfileConfig, popupCardConfig};