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
  }
  
  getUserInfo () {
    return {name: this._userName.textContent, occupation: this._userOccupation.textContent};
  }
  
  setUserInfo (name, occupation) {
    this._userName.textContent = name;
    this._userOccupation.textContent = occupation;
  }
  
}