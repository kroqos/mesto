import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
  }

  open(name, pic) {
    super.open();

    this._popup.querySelector('.popup__image-title').textContent = name;
    this._popup.querySelector('.popup__photo').src = pic;
    this._popup.querySelector('.popup__photo').alt = name;
  }
}
