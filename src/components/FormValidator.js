export default class FormValidator {
  constructor({ selectorsConfig, formElement }) {
    this._form = formElement;
    this._disabledSubmitButtonClass = selectorsConfig.disabledSubmitButtonClass;
    this._inputFieldErrorClass = selectorsConfig.inputErrorClass;
    this._submitButton = this._form.querySelector(
      selectorsConfig.submitButtonSelector
    );
    this._inputFields = Array.from(
      this._form.querySelectorAll(selectorsConfig.inputSelector)
    );
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._toggleSubmitButtonState();
    this._inputFields.forEach((inputElement) => {
      this._hideInputIsInvalid(inputElement);
    });
  }

  enableSubmitButton() {
    this._submitButton.removeAttribute('disabled');
    this._submitButton.classList.remove(this._disabledSubmitButtonClass);
  }

  disableSubmitButton() {
    this._submitButton.setAttribute('disabled', true);
    this._submitButton.classList.add(this._disabledSubmitButtonClass);
  }

  _setEventListeners() {
    this._toggleSubmitButtonState();

    this._inputFields.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._showInputValidityState(inputElement);
        this._toggleSubmitButtonState();
      });
    });
  }

  _toggleSubmitButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this.enableSubmitButton();
    }
  }

  _showInputValidityState(input) {
    if (!input.validity.valid) {
      this._showInputIsInvalid(input, input.validationMessage);
    } else {
      this._hideInputIsInvalid(input);
    }
  }

  _showInputIsInvalid(input, errorMessage) {
    const errorText = this._form.querySelector(`.${input.id}-error`);

    input.classList.add(this._inputFieldErrorClass);
    errorText.textContent = errorMessage;
  }

  _hideInputIsInvalid(input) {
    const errorText = this._form.querySelector(`.${input.id}-error`);

    input.classList.remove(this._inputFieldErrorClass);
    errorText.textContent = '';
  }

  _hasInvalidInput() {
    return this._inputFields.some((inputField) => {
      return !inputField.validity.valid;
    });
  }
}
