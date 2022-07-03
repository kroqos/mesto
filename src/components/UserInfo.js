export default class UserInfo {
  constructor({ userNameSelector, userAboutSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userAbout = document.querySelector(userAboutSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    this._currentUserData = {
      userName: this._userName.textContent,
      userAbout: this._userAbout.textContent,
    };

    return this._currentUserData;
  }

  setUserInfo(newUserData) {
    this._userName.textContent = newUserData.name;
    this._userAbout.textContent = newUserData.about;
    this._userAvatar.src = newUserData.avatar;
    this._userAvatar.alt = newUserData.name;
  }
}
