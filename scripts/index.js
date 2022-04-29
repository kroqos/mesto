// Импорты
import { initialCards } from './initialCards.js';
import { Card } from './Card.js';
import { formSelectorsAndClasses, FormValidator } from './FormValidator.js';

// Объявление всех переменных
const root = document.querySelector('.root');
const profileEditingForm = root.querySelector('.edit-form_type_profile-edit');
const cardAddingForm = root.querySelector('.edit-form_type_add-card');
const profile = root.querySelector('.profile');
const profileEditingPopup = root.querySelector('.popup_type_profile-edit');
const cardAddingPopup = root.querySelector('.popup_type_add-card');
const imagePopup = root.querySelector('.popup_type_opened-card');
const cardsContainer = root.querySelector('.cards-container');

const imagePopupPic = imagePopup.querySelector('.popup__photo');
const imagePopupTitle = imagePopup.querySelector('.popup__image-title');

const cardsList = cardsContainer.querySelector('.grid-elements');

const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const profileEditingBttn = profile.querySelector('.profile__edit-button');
const profileAddBttn = profile.querySelector('.profile__add-button');

const profileFormName = profileEditingForm.querySelector(
  '.edit-form__input_type_name'
);
const profileFormAbout = profileEditingForm.querySelector(
  '.edit-form__input_type_about'
);

const buttonElement = profileEditingForm.querySelector(
  '.edit-form__submit-button'
);

const cardAddFormTitle = cardAddingForm.querySelector(
  '.edit-form__input_type_title'
);
const cardAddFormLink = cardAddingForm.querySelector(
  '.edit-form__input_type_link'
);

const profilePopupCloseBttn = profileEditingPopup.querySelector(
  '.popup__close-button'
);

const cardPopupCloseBttn = cardAddingPopup.querySelector(
  '.popup__close-button'
);

const closeBttnImagePopup = imagePopup.querySelector('.popup__close-button');

const validatedProfileForm = new FormValidator(
  formSelectorsAndClasses,
  profileEditingForm
);

const validatedCardForm = new FormValidator(
  formSelectorsAndClasses,
  cardAddingForm
);

// Функция записи информации из профиля в поля ввода формы
function writeProfileDataIntoEditingForm() {
  profileFormName.value = profileName.textContent;
  profileFormAbout.value = profileAbout.textContent;
}

// Функция закрытия модальных попапов
function closeModalPopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', pushEscClosePopup);
}

// Функция, закрывающая открытый в данный момент попап по нажатию Esc
function pushEscClosePopup(evt) {
  if (evt.code === 'Escape') {
    const popupOpenedNow = document.querySelector('.popup_opened');
    closeModalPopup(popupOpenedNow);
  }
}

// Функция, добавляющая документу слушатель закрытия попапов по Esc
function setEscEventListener() {
  document.addEventListener('keydown', pushEscClosePopup);
}

// Функция открытия модального попапа
function openModalPopup(popup) {
  popup.classList.add('popup_opened');
  setEscEventListener();
}

// Функция обработки клика по карточке для Card.js
function handleImageFullscreenPopup(name, pic) {
  imagePopupPic.src = pic;
  imagePopupPic.alt = name;
  imagePopupTitle.textContent = name;

  openModalPopup(imagePopup);
}

// Функция, открывающая попап с редактированием профиля
function clickOpenProfilePopup() {
  openModalPopup(profileEditingPopup);
  writeProfileDataIntoEditingForm();
  validatedProfileForm.resetValidation();
}

// Функция, открывающая попап добавления новой карточки
function clickOpenCardAddingPopup() {
  openModalPopup(cardAddingPopup);
  validatedCardForm.resetValidation();
  validatedCardForm.resetInputFields();
}

// Отдельные функции закрытия для каждого из модальных попапов
function clickCloseProfilePopup() {
  closeModalPopup(profileEditingPopup);
}

function clickCloseCardAddingPopup() {
  closeModalPopup(cardAddingPopup);
}

function clickCloseImagePopup() {
  closeModalPopup(imagePopup);
}

/* Функция, записывающая данные из формы профиля
  в сам профиль на странице и закрывающая этот попап */
function writeProfileEditingFormDataIntoProfile() {
  profileName.textContent = profileFormName.value;
  profileAbout.textContent = profileFormAbout.value;
  closeModalPopup(profileEditingPopup);
}

// Функция, закрывающая открытый в данный момент попап по клику на оверлей
function clickOverlayClosePopup(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closeModalPopup(evt.target);
  }
}

// Функция, создающая карточку
function createCard(item) {
  const cardElement = new Card(
    item,
    '.cards-template',
    handleImageFullscreenPopup
  ).createCard();
  return cardElement;
}

/* Функция, добавляющая карточки из начального массива. 
  Срабатывает при загрузке страницы */
function renderInitialCards() {
  initialCards.forEach((card) => {
    const cardElement = createCard(card);
    cardsList.append(cardElement);
  });
}
renderInitialCards();

// Функция, добавляющая новую пользовательскую карточку на страницу
function addNewCard() {
  const userCardData = {
    name: cardAddFormTitle.value,
    imageLink: cardAddFormLink.value,
  };

  const newCardElement = createCard(userCardData);

  cardsList.prepend(newCardElement);
  cardAddingForm.reset();

  // отключаем кнопку сабмита после отправки формы
  validatedCardForm.disableSubmitButton();

  closeModalPopup(cardAddingPopup);
}

validatedProfileForm.enableValidation();
validatedCardForm.enableValidation();

// Добавление слушателей
profileEditingBttn.addEventListener('click', clickOpenProfilePopup);

profileEditingForm.addEventListener(
  'submit',
  writeProfileEditingFormDataIntoProfile
);

profileAddBttn.addEventListener('click', clickOpenCardAddingPopup);

/* В evt функции addNewCard отправится форма, из которой
  уже внутри этой функции мы получим нужную кнопку сабмита,
  для того, чтобы ее выключить после отправки формы */
cardAddingForm.addEventListener('submit', addNewCard);

profilePopupCloseBttn.addEventListener('click', clickCloseProfilePopup);
cardPopupCloseBttn.addEventListener('click', clickCloseCardAddingPopup);
closeBttnImagePopup.addEventListener('click', clickCloseImagePopup);

profileEditingPopup.addEventListener('click', clickOverlayClosePopup);
cardAddingPopup.addEventListener('click', clickOverlayClosePopup);
imagePopup.addEventListener('click', clickOverlayClosePopup);
