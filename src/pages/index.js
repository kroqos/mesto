// Импорты компонентов
import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

// Импорт всех нужных констант
import {
  initialCards,
  profileEditingBttn,
  formSelectorsAndClasses,
  profileAddBttn,
  profileFormName,
  profileFormAbout,
  formValidators,
} from '../utils/constants.js';

// Импорт всех вспомогательных функций
import { openFullscreenImage, enableValidation } from '../utils/utils.js';

// Инициализация попапа изображения
export const popupWithImage = new PopupWithImage({
  popupSelector: '.popup_type_opened-card',
});

// Инициализация класса Section для
// рендеринга начального массива карточек
const section = new Section(
  {
    items: initialCards,
    renderer: (card) => {
      function createCard(card) {
        const cardElement = new Card({
          cardData: card,
          cardSelector: '.cards-template',
          imageClickHandler: openFullscreenImage,
        }).createCard();
        return cardElement;
      }

      const cardElementHtml = createCard(card);
      section.addItem(cardElementHtml);
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
    function createNewCard(userCardData) {
      const newCardElement = new Card({
        cardData: userCardData,
        cardSelector: '.cards-template',
        imageClickHandler: openFullscreenImage,
      }).createCard();

      return newCardElement;
    }

    const newCardElementHtml = createNewCard(userCardData);
    section.addItem(newCardElementHtml);
    cardAddingPopup.close();
    formValidators['card-adding-form'].disableSubmitButton();
  },
});

// Включение валидации форм
enableValidation(formSelectorsAndClasses);

// Функция, открывающая попап с редактированием профиля
function openProfilePopup() {
  profileFormName.value = userInfo.getUserInfo().userName;
  profileFormAbout.value = userInfo.getUserInfo().userAbout;

  formValidators['info-editing-form'].resetValidation();
  profilePopup.open();
}

// Функция, открывающая попап добавления новой карточки
function openCardAddingPopup() {
  cardAddingPopup.open();
  formValidators['card-adding-form'].resetValidation();
  formValidators['card-adding-form'].resetInputFields();
}

// Добавление слушателей
profileEditingBttn.addEventListener('click', openProfilePopup);
profileAddBttn.addEventListener('click', openCardAddingPopup);

cardAddingPopup.setEventListeners();
profilePopup.setEventListeners();
popupWithImage.setEventListeners();
