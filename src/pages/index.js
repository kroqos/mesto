// Импорты компонентов
import './index.css';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

// Импорт всех нужных констант
import {
  profileAvatarButton,
  profileEditingButton,
  formSelectorsAndClasses,
  profileAddButton,
  profileFormName,
  profileFormAbout,
  formValidators,
  loadingPopup,
} from '../utils/constants.js';

// Импорт всех вспомогательных функций
import { createCard, enableValidation } from '../utils/utils.js';

// Функция рендеринга карточки
export function renderCard(cardData) {
  const cardElementHtml = createCard(cardData);
  section.addItem(cardElementHtml);
}

// Инициализация класса Section
const section = new Section({
  renderer: (card) => {
    renderCard(card);
  },
  containerSelector: '.grid-elements',
});

// Инициализация попапа изображения
export const popupWithImage = new PopupWithImage({
  popupSelector: '.popup_type_opened-card',
  popupImageSelector: '.popup__photo',
  imageTitleSelector: '.popup__image-title',
});

// Инициализация класса UserInfo
const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userAboutSelector: '.profile__about',
  userAvatarSelector: '.profile__avatar',
});

// Инициализация попапа для обновления аватара
const avatarUpdatingPopup = new PopupWithForm({
  popupSelector: '.popup_type_profile-avatar-update',
  selectorsConfig: formSelectorsAndClasses,
  formSubmitHandler: (newProfileAvatar) => {
    formValidators['avatar-updating-form'].disableSubmitButton();
    avatarUpdatingPopup.showSavingProgress();
    api
      .updateUserAvatar(newProfileAvatar.secondary)
      .then((userObject) => {
        userInfo.setUserAvatar(userObject.avatar);
      })
      .then(() => avatarUpdatingPopup.close())
      .catch((err) => console.error(`Произошла ошибка: ${err}`));
  },
  submitButtonText: 'Сохранить',
});

// Инициализация класса PopupWithForm
// для попапа редактирования профиля
const profilePopup = new PopupWithForm({
  popupSelector: '.popup_type_profile-edit',
  selectorsConfig: formSelectorsAndClasses,

  formSubmitHandler: (newProfileData) => {
    formValidators['info-editing-form'].disableSubmitButton();
    profilePopup.showSavingProgress();
    api
      .updateUserInfo(newProfileData)
      .then((newProfileData) => userInfo.setUserInfo(newProfileData))
      .then(() => profilePopup.close())
      .catch((err) => console.error(`Произошла ошибка: ${err}`));
  },
  submitButtonText: 'Сохранить',
});

// Инициализация класса PopupWithForm
// для попапа добавления карточки
const cardAddingPopup = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  selectorsConfig: formSelectorsAndClasses,

  formSubmitHandler: (userCardData) => {
    formValidators['card-adding-form'].disableSubmitButton();
    cardAddingPopup.showSavingProgress();
    api
      .uploadNewCard(userCardData)
      .then((userCardData) => {
        renderCard(userCardData);
      })
      .catch((err) => console.error(`Произошла ошибка: ${err}`))
      .then(() => cardAddingPopup.close());
  },
  submitButtonText: 'Создать',
});

// Инициализация попапа с подтверждением удаления
export const popupWithDeletionConfirmation = new PopupWithConfirmation({
  popupSelector: '.popup_type_delete-confirmation',
});

// Иниациализация класса Api
export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44',
  headers: {
    // не очень безопасно получается, наверное...
    // не знаю, как скрыть токен из общего доступа
    authorization: 'cf0c08f2-8f2d-418f-9eab-35c4104d8607',
    'Content-Type': 'application/json',
  },
});

// Добавление информации о юзере и его аватарки с сервера на страницу
api.getUserInfo().then((userData) => {
  userInfo.setUserAvatar(userData.avatar);
  userInfo.setUserInfo(userData);
});

// Промис для рендеринга карточек с сервера
Promise.resolve(api.getUploadedCards())
  .then((cards) => {
    section.renderItems(cards);
    loadingPopup.style.display = 'none';
  })
  .catch((err) => console.error(`Произошла ошибка: ${err}`));

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

function openAvatarUpdatingPopup() {
  avatarUpdatingPopup.open();
  formValidators['avatar-updating-form'].resetValidation();
}

// Добавление слушателей
profileAvatarButton.addEventListener('click', openAvatarUpdatingPopup);
profileEditingButton.addEventListener('click', openProfilePopup);
profileAddButton.addEventListener('click', openCardAddingPopup);

cardAddingPopup.setEventListeners();
avatarUpdatingPopup.setEventListeners();
profilePopup.setEventListeners();
popupWithImage.setEventListeners();
popupWithDeletionConfirmation.setEventListeners();
