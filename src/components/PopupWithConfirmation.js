import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });

    this._confirmationButton = this._popup.querySelector(
      '.popup__confirm-button'
    );
  }

  disableConfirmButton() {
    this._confirmationButton.setAttribute('disabled', true);
  }

  showDeletionProgress() {
    this._confirmationButton.textContent = 'Удаление...';
  }

  _showDefaultButtonText() {
    this._confirmationButton.textContent = 'Да';
  }

  open() {
    super.open();

    this._showDefaultButtonText();
    this._confirmationButton.removeAttribute('disabled');
  }

  setConfirmationHandler(submitAction) {
    this._confirmationHandler = submitAction;
  }

  setEventListeners() {
    super.setEventListeners();

    this._confirmationButton.addEventListener('click', () =>
      this._confirmationHandler()
    );
  }
}
