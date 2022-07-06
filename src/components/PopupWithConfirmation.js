import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });

    this._confirmationButton = this._popup.querySelector(
      '.popup__confirm-button'
    );
  }

  _showDeletionProgress() {
    this._confirmationButton.textContent = 'Удаление...';
  }

  _showDefaultButtonState() {
    this._confirmationButton.textContent = 'Да';
  }

  open() {
    super.open();

    this._showDefaultButtonState();
  }

  setConfirmationHandler(submitAction) {
    this._confirmationHandler = submitAction;
  }

  setEventListeners() {
    super.setEventListeners();

    this._confirmationButton.addEventListener('click', () =>
      this._showDeletionProgress()
    );
    this._confirmationButton.addEventListener('click', () =>
      this._confirmationHandler()
    );
  }
}
