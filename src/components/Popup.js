import { root } from '../utils/constants.js';

export default class Popup {
  constructor({ popupSelector }) {
    this._popup = root.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
      if (evt.target.classList.contains('popup__close-button')) {
        this.close();
      }
    });

    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  _handleEscClose(evt) {
    if (evt.code === 'Escape') {
      this.close();
      document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }
  }
}
