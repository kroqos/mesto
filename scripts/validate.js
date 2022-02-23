// Объект со всеми классами и селекторами, используемыми для валидации форм
const formSelectorsAndClasses = {
  formSelector: '.edit-form',
  inputSelector: '.edit-form__input',
  submitButtonSelector: '.edit-form__submit-button',
  disabledSubmitButtonClass: 'edit-form__submit-button_disabled',
  inputErrorClass: 'edit-form__input_type_error',
};

// Функция, показывающая невалидность поля ввода и текст ошибки
function showInputIsInvalid(formElement, inputElement, errorMessage, selector) {
  const errorText = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(selector.inputErrorClass);
  errorText.textContent = errorMessage;
}

// Функция, убирающая невалидность поля ввода и текст ошибки
function hideInputIsInvalid(formElement, inputELement, selector) {
  const errorText = formElement.querySelector(`.${inputELement.id}-error`);

  inputELement.classList.remove(selector.inputErrorClass);
  errorText.textContent = '';
}

// Функция проверки поля ввода на валидность и изменения его внешнего вида
function inputIsValid(formElement, inputELement, selector) {
  if (!inputELement.validity.valid) {
    showInputIsInvalid(
      formElement,
      inputELement,
      inputELement.validationMessage,
      selector
    );
  } else {
    hideInputIsInvalid(formElement, inputELement, selector);
  }
}

// Функция, добавляющая слушатели всем полям формы
function setEventListeners(formElement, selector) {
  const inputElements = Array.from(
    formElement.querySelectorAll(selector.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    selector.submitButtonSelector
  );

  toggleSubmitButtonState(inputElements, buttonElement, selector);
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      inputIsValid(formElement, inputElement, selector);
      toggleSubmitButtonState(inputElements, buttonElement, selector);
    });
  });
}

/* Функция проверки валидности полей в форме
Возвращает true, если есть хотя бы одно невалидное поле */
function hasInvalidInput(inputElements) {
  return inputElements.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Функция, активирующая кнопку сабмита
function enableSubmitButton(buttonElement, selector) {
  buttonElement.removeAttribute('disabled');
  buttonElement.classList.remove(selector.disabledSubmitButtonClass);
}

// Функция, деактивирующая кнопку сабмита
function disableSubmitButton(buttonElement, selector) {
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add(selector.disabledSubmitButtonClass);
}

// Функция изменения состояния кнопки сабмита в зависимости от валидности полей в форме
function toggleSubmitButtonState(inputElements, buttonElement, selector) {
  if (hasInvalidInput(inputElements, selector)) {
    disableSubmitButton(buttonElement, selector);
  } else {
    enableSubmitButton(buttonElement, selector);
  }
}

/* Функция, включающая валидацию всех форм на странице
Также отключает дефолтное поведение всех сабмитов форм */
function enableValidation(selector) {
  const formElements = Array.from(
    document.querySelectorAll(selector.formSelector)
  );

  formElements.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, selector);
  });
}

enableValidation(formSelectorsAndClasses);

export { enableSubmitButton, disableSubmitButton, formSelectorsAndClasses };
