// Объявление всех констант
const profile = document.querySelector('.profile');
const profileEditingForm = document.querySelector(
  '.edit-form_type_profile-edit'
);
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
    main: 'Карачаевск',
    secondary: image1,
  },
  {
    main: 'Гора Эльбрус',
    secondary: image2,
  },
  {
    main: 'Домбай',
    secondary: image3,
  },
  {
    main: 'Челябинск',
    secondary: image4,
  },
  {
    main: 'Ивановская область',
    secondary: image5,
  },
  {
    main: 'Шерегеш',
    secondary: image6,
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
