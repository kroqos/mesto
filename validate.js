// Объект со всеми классами и элементами, используемыми для валидации
const classes = {
    form: '.edit-form',
    input: '.edit-form__input',
    submitButton: '.edit-form__submit-button',
    disabledSubmitButton: 'edit-form__submit-button_disabled',
    inputError: 'edit-form__input_error',
};

// Функция, показывающая невалидность поля ввода
function showInputIsInvalid(formElement, inputElement, errorMessage) {
    const errorText = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(classes.inputError);
    errorText.textContent = errorMessage;
};

// Функция, убирающая невалидность поля ввода
function hideInputIsInvalid(formElement, inputELement) {
    const errorText = formElement.querySelector(`.${inputELement.id}-error`);

    inputELement.classList.remove(classes.inputError);
    errorText.textContent = '';
};

// Функция проверки поля ввода на валидность и изменения его внешнего вида
function inputIsValid(formElement, inputELement) {
    if (!inputELement.validity.valid) {
        showInputIsInvalid(formElement, inputELement, inputELement.validationMessage);
    } else {
        hideInputIsInvalid(formElement, inputELement);
    }
};

// Функция добавления слушателей всем полям формы
function setEventListeners(formElement) {
    const inputElements = Array.from(formElement.querySelectorAll(classes.input));
    const buttonElement = formElement.querySelector(classes.submitButton);

    toggleSubmitButtonState(inputElements, buttonElement);
    inputElements.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            inputIsValid(formElement, inputElement);
            toggleSubmitButtonState(inputElements, buttonElement);
        });
    });
};

// Функция проверки формы на валидность полей в ней. Возвращает true, 
// если есть хотя бы одно невалидное поле
function hasInvalidInput(inputElements) {
    return inputElements.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

// Функция изменения состояния кнопки сабмита в зависимости от валидности полей в форме
function toggleSubmitButtonState(inputElements, buttonElement) {
    if (hasInvalidInput(inputElements)) {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add(classes.disabledSubmitButton);
    } else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove(classes.disabledSubmitButton);
    }
};

// Функция добавления, включающая валидацию для всех форм на странице
function enableValidation() {
    const formElements = Array.from(document.querySelectorAll(classes.form));

    formElements.forEach(formElement => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            // enableValidation();
        });

        setEventListeners(formElement);
    });
};

enableValidation();