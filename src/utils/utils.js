import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import { popupWithImage } from '../pages/index.js';
import { formValidators } from './constants.js';

// Функция открытия изображения в фулскрин
function openFullscreenImage(name, pic) {
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

// Функция создания новой карточки
export function createCard(card) {
  const cardElement = new Card({
    cardData: card,
    cardSelector: '.cards-template',
    imageClickHandler: openFullscreenImage,
  }).createCard();
  return cardElement;
}
