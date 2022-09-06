export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }
  
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: '77ff3fbe-135e-4442-b69c-13d620392262'
      },
    }).then(res => {
      if (res.ok) {
        return res.json(); // возврат json массива из объектов { likes, _id, name, link, owner, createdAt }
      }
      return Promise.reject(`Ошибка: ${res.status}`);//возврат ошибки
    })
  }
  
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: '77ff3fbe-135e-4442-b69c-13d620392262'
      },
    }).then(res => {
      if (res.ok) {
        return res.json(); // возврат json {name, about, avatar, _id, cohort}
      }
      return Promise.reject(`Ошибка: ${res.status}`);//возврат ошибки
    })
  }
  
  
  putProfileData(name, about) {
    return fetch(`${this._baseUrl}/users/me`, { // Редактирование профиля
      method: 'PATCH',
      headers: {
        authorization: '77ff3fbe-135e-4442-b69c-13d620392262',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json(); // возврат json {name, about, avatar, _id, cohort}
        }
        return Promise.reject(`Ошибка: ${res.status}`);//возврат ошибки
      })
  }
  
  putNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards `, {
      method: 'POST',
      headers: {
        authorization: '77ff3fbe-135e-4442-b69c-13d620392262',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  putNewAvatar(avatarUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: '77ff3fbe-135e-4442-b69c-13d620392262',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarUrl
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: '77ff3fbe-135e-4442-b69c-13d620392262',
        'Content-Type': 'application/json'
      },
    })
      .then(res => {
        if (res.ok) {
          return true;
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
  
  putLike (cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: '77ff3fbe-135e-4442-b69c-13d620392262'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
  
  removeLike (cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: '77ff3fbe-135e-4442-b69c-13d620392262'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
  
}