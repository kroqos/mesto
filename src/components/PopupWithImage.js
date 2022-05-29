import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({ popupSelector, popupImageSelector, imageTitleSelector }) {
    super({ popupSelector });
    this._popupPicture = this._popup.querySelector(popupImageSelector);
    this._pictureTitle =
      this._popup.querySelector(imageTitleSelector).textContent;
  }

  open(name, pic) {
    super.open();

    this._pictureTitle = name;
    this._popupPicture.src = pic;
    this._popupPicture.alt = name;
  }
}
