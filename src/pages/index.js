import './index.css';
import FormValidate from '../components/FormValidator.js';
import Card from "../components/Сard.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import {cardConfig, validateConfig, profileOpenButton, cardOpenButton, inputOccupation, inputName, confirmButton, profileUserAvatar} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupConfirm from "../components/PopupConfirm.js";

//Функции
function createCard ({name, link, likes, _id, owner}) { // Создание карточки
  const card = new Card({name, link, likes, _id, owner}, userInfo.getUserId(),'#photo-grid__template', cardConfig, handleImageClick, handleDelClick, handleLike);
  return card.generateCard(); // возвращаем для использования
}

// function checkOwner ({name, about}) {
//   const ownerInfo = userInfo.getUserInfo();
//   const anotherUserInfo = {name, about};
//   return ((anotherUserInfo.name == ownerInfo.name) && (ownerInfo.occupation == anotherUserInfo.about));
// }

function handleImageClick (item) { // обработчик клика по карточке
  imagePopup.open(item);
}

function handleDelClick (cardId, handleDel) {
  confirmPopup.open();
  confirmPopup.putCardId(cardId, handleDel);
}

function handleProfileEditSubmit (values) {
  profilePopup.renderLoading(true, 'Сохряняем...');
  api.putProfileData(values.popup__input_type_name, values.popup__input_type_occupation)
    .then(res => {
      userInfo.setUserInfo(res.name, res.about);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      profilePopup.renderLoading(false);
      profilePopup.close();
    })
}

function handleCardAddSubmit (values) {
  cardPopup.renderLoading(true, 'Создаем...')
  const {'popup__input_type_image-caption': name, 'popup__input_type_image-src': link,} = values; // через деструктуризацию заменяем имена на нужные нам
  api.putNewCard(name, link)
    .then(res => {
      cardList.prependItem(createCard(res));
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      cardPopup.renderLoading(false);
      cardPopup.close();
    })
}

function handleProfileImageSubmit (values) {
  profileImagePopup.renderLoading(true, 'Сохряняем...');
  const {'popup__input_type_profile-image': url} = values;
  api.putNewAvatar(url)
    .then(res => {
      userInfo.setUserAvatar(res.avatar);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      profileImagePopup.renderLoading(false);
      profileImagePopup.close();
    })
}

function handleLike (cardId) {
  if (this.isLiked()) {
    api.removeLike(cardId)
      .then(res => {
        this.updateLikes(res.likes);
      })
      .catch(error => {
        console.log(error);
      })
  } else {
    api.putLike(cardId)
      .then(res => {
        this.updateLikes(res.likes);
      })
      .catch(error => {
        console.log(error);
      })
  }
}

function handleRemoveCard () {
  api.removeCard(confirmPopup.getCardId())
    .then(res => {
      if (res) {

        confirmPopup.close();
      }
    })
    .catch(error => {
      console.log(error);
    })
}

//const работы попапа профиля изменения картинки
const profileImagePopup = new PopupWithForm('.popup_type_profile-image', handleProfileImageSubmit);
const popupImageProfileValidate = new FormValidate(validateConfig, document.querySelector('.popup__form_type_profile-image'));

// const работы попапа профиля
const userInfo = new UserInfo('.profile__name', '.profile__occupation');
const profilePopup = new PopupWithForm('.popup_type_profile', handleProfileEditSubmit);
const popupProfileValidate = new FormValidate(validateConfig, document.querySelector('.popup__form_type_edit-profile'));

// const работы попапа добавления карточки
const cardPopup = new PopupWithForm('.popup_type_card', handleCardAddSubmit);
const popupCardValidate = new FormValidate(validateConfig, document.querySelector('.popup__form_type_add-content'));

// const работы попапа картинки
const imagePopup = new PopupWithImage('.popup_type_image');

// const работы попапа подтверждения удаления
const confirmPopup = new PopupConfirm('.popup_type_confirm', handleRemoveCard);

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

Promise.all([
  api.getUserInfo(),
  api.getInitialCards(),

])
  .then(([info, initialCards]) => {
    userInfo.setUserId(info._id);
    userInfo.setUserInfo(info.name, info.about);
    userInfo.setUserAvatar(info.avatar);
    cardList.renderItems(initialCards);
})
  .catch(err => {
    console.log(err);
  })


//вызовы функций
profilePopup.setEventListeners();
cardPopup.setEventListeners();
imagePopup.setEventListeners();
confirmPopup.setEventListeners();
profileImagePopup.setEventListeners();
popupProfileValidate.enableValidate();
popupCardValidate.enableValidate();
popupImageProfileValidate.enableValidate();

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

profileUserAvatar.addEventListener('click', () => {
  popupImageProfileValidate.switchStateForm();
  profileImagePopup.open();
})

confirmButton.addEventListener('click', () => {

})

