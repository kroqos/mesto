import { popupWithImage } from '../pages/index.js';
import FormValidator from '../components/FormValidator.js';
import { formValidators } from './constants.js';

// Функция открытия изображения в фулскрин
export function openFullscreenImage(name, pic) {
  popupWithImage.open(name, pic);
}

// Функция включения валидации для всех форм на странице
export function enableValidation(selectorsConfig) {
  const formList = Array.from(
    document.querySelectorAll(selectorsConfig.formSelector)
  );

  formList.forEach((formElement) => {
    const validator = new FormValidator({
      selectorsConfig: selectorsConfig,
      formElement: formElement,
    });
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
}
