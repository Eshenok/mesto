/*
 *Класс UserInfo
 * принимает в конструктор Селектор поля с именем пользователя и Селектор поля с профессией.
 * два публичных метода:
 * getUserInfo - возвращает объект с текстом из полей userName|userOccupation;
 * setUserInfo - принимает на вход Имя Input и Профессию Input, затем заменяет значения в поле userName|userOccupation;
 */

export default class UserInfo {
  constructor(userNameSelector, userOccupationSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userOccupation = document.querySelector(userOccupationSelector);
    this._profileAvatar = document.querySelector('.profile__avatar');

  }
  
  getUserInfo () {
    return {name: this._userName.textContent, occupation: this._userOccupation.textContent};
  }

  getUserId () {
    return this._userId;
  }

  setUserId (userId) {
    this._userId = userId;
  }

  setUserAvatar (url) {
    this._profileAvatar.style.backgroundImage = `url(${url})`;
  }
  
  setUserInfo (name, occupation) {
    this._userName.textContent = name;
    this._userOccupation.textContent = occupation;
  }
  
}