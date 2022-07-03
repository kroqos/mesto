// Объявление всех констант
const profile = document.querySelector('.profile');
const profileEditingForm = document.querySelector(
  '.edit-form_type_profile-edit'
);

export const loadingPopup = document.querySelector('.loading-popup');

export const profileEditingButton = profile.querySelector(
  '.profile__edit-button'
);

export const profileAddButton = profile.querySelector('.profile__add-button');

export const profileFormName = profileEditingForm.querySelector(
  '.edit-form__input_type_name'
);

export const profileFormAbout = profileEditingForm.querySelector(
  '.edit-form__input_type_about'
);

export const formValidators = {};

// Объект со всеми классами и селекторами, используемыми для валидации форм
export const formSelectorsAndClasses = {
  formSelector: '.edit-form',
  inputSelector: '.edit-form__input',
  submitButtonSelector: '.edit-form__submit-button',
  disabledSubmitButtonClass: 'edit-form__submit-button_disabled',
  inputErrorClass: 'edit-form__input_type_error',
};
