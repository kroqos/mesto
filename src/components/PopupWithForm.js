import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, selectorsConfig, formSubmitHandler }) {
    super({
      popupSelector,
    });

    this._submitHandler = formSubmitHandler;
    this._form = this._popup.querySelector(selectorsConfig.formSelector);
    this._inputFields = Array.from(
      this._popup.querySelectorAll(selectorsConfig.inputSelector)
    );
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues = () => {
    this._userInputData = {};
    this._inputFields.forEach((inputField) => {
      this._userInputData[inputField.name] = inputField.value;
    });
    return this._userInputData;
  };

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', () =>
      this._submitHandler(this._getInputValues())
    );
  }
}
