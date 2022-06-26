// Импорты компонентов
import './index.css';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

// Импорт всех нужных констант
import {
  initialCards,
  profileEditingButton,
  formSelectorsAndClasses,
  profileAddButton,
  profileFormName,
  profileFormAbout,
  formValidators,
} from '../utils/constants.js';

// Импорт всех вспомогательных функций
import { createCard, enableValidation } from '../utils/utils.js';

// Функция рендеринга карточки
export function renderCard(cardData) {
  const cardElementHtml = createCard(cardData);
  section.addItem(cardElementHtml);
}

// Инициализация попапа изображения
export const popupWithImage = new PopupWithImage({
  popupSelector: '.popup_type_opened-card',
  popupImageSelector: '.popup__photo',
  imageTitleSelector: '.popup__image-title',
});

// Инициализация класса Section для
// рендеринга начального массива карточек
const section = new Section(
  {
    items: initialCards,
    renderer: (card) => {
      renderCard(card);
    },
  },
  '.grid-elements'
);

section.renderItems();

// Инициализация класса UserInfo
const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userAboutSelector: '.profile__about',
});

// Инициализации класса PopupWithForm
// для попапа редактирования профиля
const profilePopup = new PopupWithForm({
  popupSelector: '.popup_type_profile-edit',
  selectorsConfig: formSelectorsAndClasses,

  formSubmitHandler: (newProfileData) => {
    userInfo.setUserInfo(newProfileData);
    profilePopup.close();
  },
});

// Инициализации класса PopupWithForm
// для попапа добавления карточки
const cardAddingPopup = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  selectorsConfig: formSelectorsAndClasses,

  formSubmitHandler: (userCardData) => {
    renderCard(userCardData);
    cardAddingPopup.close();
    formValidators['card-adding-form'].disableSubmitButton();
  },
});

// Включение валидации форм
enableValidation(formSelectorsAndClasses);

// Функция, открывающая попап с редактированием профиля
function openProfilePopup() {
  const { userName, userAbout } = userInfo.getUserInfo();

  profileFormName.value = userName;
  profileFormAbout.value = userAbout;

  formValidators['info-editing-form'].resetValidation();
  profilePopup.open();
}

// Функция, открывающая попап добавления новой карточки
function openCardAddingPopup() {
  cardAddingPopup.open();
  formValidators['card-adding-form'].resetValidation();
}

// Добавление слушателей
profileEditingButton.addEventListener('click', openProfilePopup);
profileAddButton.addEventListener('click', openCardAddingPopup);

cardAddingPopup.setEventListeners();
profilePopup.setEventListeners();
popupWithImage.setEventListeners();