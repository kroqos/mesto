import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor({
    popupSelector,
    selectorsConfig,
    formSubmitHandler,
    submitButtonText,
  }) {
    super({
      popupSelector,
    });

    this._submitButtonText = submitButtonText;
    this._submitHandler = formSubmitHandler;
    this._form = this._popup.querySelector(selectorsConfig.formSelector);
    this._submitButton = this._popup.querySelector(
      selectorsConfig.submitButtonSelector
    );
    this._inputFields = Array.from(
      this._popup.querySelectorAll(selectorsConfig.inputSelector)
    );
  }

  open() {
    super.open();
    this._submitButton.textContent = this._submitButtonText;
  }

  close() {
    super.close();
    this._form.reset();
  }

  showSavingProgress() {
    this._submitButton.textContent = 'Сохранение...';
  }

  _getInputValues = () => {
    this._userInputData = {};
    this._inputFields.forEach((inputField) => {
      this._userInputData[inputField.name] = inputField.value;
    });
    return this._userInputData;
  };

  setEventListeners() {
    // Тоже совершенно не понял, как сделать так,
    // чтобы цепочка промиса уходила внутрь обработчика
    super.setEventListeners();

    this._form.addEventListener('submit', () =>
      this._submitHandler(this._getInputValues())
    );
  }
}
