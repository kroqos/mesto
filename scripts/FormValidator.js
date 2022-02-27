// Объект со всеми классами и селекторами, используемыми для валидации форм
export const formSelectorsAndClasses = {
  inputSelector: '.edit-form__input',
  submitButtonSelector: '.edit-form__submit-button',
  disabledSubmitButtonClass: 'edit-form__submit-button_disabled',
  inputErrorClass: 'edit-form__input_type_error',
};

export class FormValidator {
  constructor(selectorsConfig, formElement) {
    this._form = formElement;
    this._inputField = selectorsConfig.inputSelector;
    this._submitButton = selectorsConfig.submitButtonSelector;
    this._disabledSubmitButton = selectorsConfig.disabledSubmitButtonClass;
    this._inputFieldError = selectorsConfig.inputErrorClass;
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  _setEventListeners() {
    const inputFields = Array.from(
      this._form.querySelectorAll(this._inputField)
    );

    this._toggleSubmitButtonState();

    inputFields.forEach((inputElement) => {
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

    input.classList.add(this._inputFieldError);
    errorText.textContent = errorMessage;
  }

  _hideInputIsInvalid(input) {
    const errorText = this._form.querySelector(`.${input.id}-error`);

    input.classList.remove(this._inputFieldError);
    errorText.textContent = '';
  }

  enableSubmitButton() {
    const submitButton = this._form.querySelector(this._submitButton);

    submitButton.removeAttribute('disabled');
    submitButton.classList.remove(this._disabledSubmitButton);
  }

  disableSubmitButton() {
    const submitButton = this._form.querySelector(this._submitButton);

    submitButton.setAttribute('disabled', true);
    submitButton.classList.add(this._disabledSubmitButton);
  }

  _hasInvalidInput() {
    const inputFields = Array.from(
      this._form.querySelectorAll(this._inputField)
    );

    return inputFields.some((inputField) => {
      return !inputField.validity.valid;
    });
  }
}
