import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import { api } from '../pages/index.js';
import { popupWithDeletionConfirmation } from '../pages/index.js';
import { popupWithImage } from '../pages/index.js';
import { formValidators } from './constants.js';

// Функция открытия изображения в фулскрин
function openFullscreenImage(name, pic) {
  popupWithImage.open(name, pic);
}

function openCardDeletionPopup(card) {
  popupWithDeletionConfirmation.open();
  popupWithDeletionConfirmation.setConfirmationHandler(() => {
    api
      .deleteCard(card.cardId)
      .then(() => {
        card.removeCard();
        popupWithDeletionConfirmation.close();
      })
      .catch((err) => console.error(err));
  });
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
export function createCard(cardData) {
  const card = new Card({
    cardData: cardData,
    cardSelector: '.cards-template',
    imageClickHandler: openFullscreenImage,
    likeHandler: () => api.likeCard(cardData._id),
    removeLikeHandler: () => api.unlikeCard(cardData._id),
  });
  card.setTrashIconClickHandler(() => {
    openCardDeletionPopup(card);
  });
  return card.createCard();
}
