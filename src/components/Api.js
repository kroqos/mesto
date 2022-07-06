export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Произошла ошибка, код ${res.status}`);
      })
      .catch((err) => console.error(err));
  }

  updateUserInfo(newProfileData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newProfileData.main,
        about: newProfileData.secondary,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Произошла ошибка, код ${res.status}`);
      })
      .catch((err) => console.error(err));
  }

  getUploadedCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Произошла ошибка, код ${res.status}`);
      })
      .then((res) => res.reverse())
      .catch((err) => console.error(err));
  }

  uploadNewCard(userCardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: userCardData.main,
        link: userCardData.secondary,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Произошла ошибка, код ${res.status}`);
      })
      .catch((err) => console.error(err));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Произошла ошибка, код ${res.status}`);
      })
      .catch((err) => console.error(err));
  }
}
