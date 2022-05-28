export default class UserInfo {
  constructor({ userNameSelector, userAboutSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userAbout = document.querySelector(userAboutSelector);
  }

  getUserInfo() {
    this._currentUserData = {
      userName: this._userName.textContent,
      userAbout: this._userAbout.textContent,
    };

    return this._currentUserData;
  }

  setUserInfo(newUserData) {
    this._userName.textContent = newUserData.main;
    this._userAbout.textContent = newUserData.secondary;
  }
}
