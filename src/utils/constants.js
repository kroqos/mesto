// Объявление всех констант
export const root = document.querySelector('.root');
export const profileEditingForm = root.querySelector(
  '.edit-form_type_profile-edit'
);
export const cardAddingForm = root.querySelector('.edit-form_type_add-card');
const profile = root.querySelector('.profile');
export const profileEditingPopup = root.querySelector(
  '.popup_type_profile-edit'
);
export const cardAddingPopup = root.querySelector('.popup_type_add-card');
const cardsContainer = root.querySelector('.cards-container');

export const cardsList = cardsContainer.querySelector('.grid-elements');

export const profileName = profile.querySelector('.profile__name');
export const profileAbout = profile.querySelector('.profile__about');
export const profileEditingBttn = profile.querySelector(
  '.profile__edit-button'
);
export const profileAddBttn = profile.querySelector('.profile__add-button');

export const profileFormName = profileEditingForm.querySelector(
  '.edit-form__input_type_name'
);
export const profileFormAbout = profileEditingForm.querySelector(
  '.edit-form__input_type_about'
);

export const cardAddFormTitle = cardAddingForm.querySelector(
  '.edit-form__input_type_title'
);
export const cardAddFormLink = cardAddingForm.querySelector(
  '.edit-form__input_type_link'
);

export const formValidators = {};

// Константы для массива с начальными карточками
const image1 = new URL('../images/cards/card__photo-1.jpg', import.meta.url);
const image2 = new URL('../images/cards/card__photo-2.jpg', import.meta.url);
const image3 = new URL('../images/cards/card__photo-3.jpg', import.meta.url);
const image4 = new URL('../images/cards/card__photo-4.jpg', import.meta.url);
const image5 = new URL('../images/cards/card__photo-5.jpg', import.meta.url);
const image6 = new URL('../images/cards/card__photo-6.jpg', import.meta.url);

// Массив с начальными карточками
export const initialCards = [
  {
    name: 'Карачаевск',
    imageLink: image1,
  },
  {
    name: 'Гора Эльбрус',
    imageLink: image2,
  },
  {
    name: 'Домбай',
    imageLink: image3,
  },
  {
    name: 'Челябинск',
    imageLink: image4,
  },
  {
    name: 'Ивановская область',
    imageLink: image5,
  },
  {
    name: 'Шерегеш',
    imageLink: image6,
  },
];

// Объект со всеми классами и селекторами, используемыми для валидации форм
export const formSelectorsAndClasses = {
  formSelector: '.edit-form',
  inputSelector: '.edit-form__input',
  submitButtonSelector: '.edit-form__submit-button',
  disabledSubmitButtonClass: 'edit-form__submit-button_disabled',
  inputErrorClass: 'edit-form__input_type_error',
};
