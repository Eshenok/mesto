'use strict'

// import './pages/index.css';
import FormValidate from './components/FormValidator.js';
import Card from "./components/Сard.js";
import Section from "./components/Section.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import {cardConfig, validateConfig, profileOpenButton, cardOpenButton, inputOccupation, inputName, profileUserName, profileUserOccupation, profileUserAvatar, confirmButton} from "./utils/constants.js";
import UserInfo from "./components/UserInfo.js";
import Api from "./components/Api.js";
import PopupConfirm from "./components/PopupConfirm.js";

//Функции
function createCard ({name, link, likes, _id, owner}) { // Создание карточки
  const card = new Card({name, link, likes, _id, owner}, '#photo-grid__template', cardConfig, handleImageClick, handleDelClick, checkOwner);
  return card.generateCard(); // возвращаем для использования
}

function checkOwner ({name, about}) {
  const ownerInfo = userInfo.getUserInfo();
  const anotherUserInfo = {name, about};
  return ((anotherUserInfo.name == ownerInfo.name) && (ownerInfo.occupation == anotherUserInfo.about));
}

function handleImageClick (item) { // обработчик клика по карточке
  imagePopup.open(item);
}

function handleDelClick (cardId, handleDelButton) {
  confirmPopup.open();
  confirmPopup.putCardId(cardId, handleDelButton);
  console.log(handleDelButton);
}

function handleProfileEditSubmit (evt, values) {
  evt.preventDefault();
  const inputValues = values; // делает const getInputValues();
  api.putProfileData(inputValues.popup__input_type_name, inputValues.popup__input_type_occupation)
    .then(res => {
      userInfo.setUserInfo(res.name, res.about);
    })
  this.close();
}

function handleCardAddSubmit (evt, values) {
  evt.preventDefault();
  const {'popup__input_type_image-caption': name, 'popup__input_type_image-src': link,} = values; // через деструктуризацию заменяем имена на нужные нам
  api.putNewCard(name, link)
    .then(res => {
      cardList.prependItem(createCard(res));
    })
  this.close();
}

//const работы попапа профиля изменения картинки
// const profileImagePopup = new PopupWithForm('.popup_type_profile-image', handleProfileImageEditSubmit);


// const работы попапа профиля
const userInfo = new UserInfo('.profile__name', '.profile__occupation');
const profilePopup = new PopupWithForm('.popup_type_profile', handleProfileEditSubmit);
const popupProfileValidate = new FormValidate(validateConfig, '.popup__form_type_edit-profile');

// const работы попапа добавления карточки
const cardPopup = new PopupWithForm('.popup_type_card', handleCardAddSubmit);
const popupCardValidate = new FormValidate(validateConfig, '.popup__form_type_add-content');

// const работы попапа картинки
const imagePopup = new PopupWithImage('.popup_type_image');

// const работы попапа подтверждения удаления
const confirmPopup = new PopupConfirm('.popup_type_confirm');

// const вставка в html
const cardList = new Section({ renderer: (items) => { // внутри renderer -> создаем константу карточки и генерим ее через Card
    cardList.appendItem(createCard(items));
  }
}, '.photo-grid');

//API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49',
  headers: {
    authorization: '77ff3fbe-135e-4442-b69c-13d620392262',
    'Content-Type': 'application/json'
  }
});

api.getInitialCards()
  .then(result => {
    console.log(result)
    cardList.renderItems(result);
})
  .catch(error => {
    console.log(error); //Логика ошибки;
  })

api.getUserInfo()
  .then(result => { //подгружаем userInfo
    userInfo.setUserInfo(result.name, result.about);
    profileUserAvatar.style.backgroundImage = `url(${result.avatar})`;
  })
  .catch(error => {
    console.log(error);
  })

// api.removeCard(cardId);

//вызовы функций
profilePopup.setEventListeners();
cardPopup.setEventListeners();
imagePopup.setEventListeners();
confirmPopup.setEventListeners();
popupProfileValidate.enableValidate();
popupCardValidate.enableValidate();

//Прослушки
profileOpenButton.addEventListener('click', () => { //Прослушка кнопки открытия попапа редактирования профиля
  const userInfoValues = userInfo.getUserInfo();
  inputName.value = userInfoValues.name;
  inputOccupation.value = userInfoValues.occupation; // вставляем в инпуты значения
  popupProfileValidate.switchStateForm(); // Решение проблемы с сохранением ошибки после закрытия попапа
  profilePopup.open();
});

cardOpenButton.addEventListener('click', () => { //Прослушка кнопки открытия попапа добавления карточки
  popupCardValidate.switchStateForm();
  cardPopup.open();
});

confirmButton.addEventListener('click', () => {
  api.removeCard(confirmPopup.getCardId())
    .then(res => {
      if (res) {
        confirmPopup.removeCard();
        confirmPopup.close();
      }
    })
    .catch(error => {
      console.log(error);
    })
})

