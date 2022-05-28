// Импорты
import './index.css';
import { initialCards } from '../utils/constants.js';
import { formSelectorsAndClasses } from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

// Все нужные константы
import {
  root,
  profileName,
  profileAbout,
  profileEditingBttn,
  profileAddBttn,
  profileFormName,
  profileFormAbout,
  formValidators,
} from '../utils/constants.js';

// Функция включения валидации для всех форм на странице
function enableValidation(selectorsConfig) {
  const formList = Array.from(
    root.querySelectorAll(selectorsConfig.formSelector)
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

enableValidation(formSelectorsAndClasses);

// Инициализация попапа изображения
const popupWithImage = new PopupWithImage({
  popupSelector: '.popup_type_opened-card',
});

// Функция открытия изображения в фулскрин
function openFullscreenImage(name, pic) {
  popupWithImage.open(name, pic);
}

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

// Инициализации класса PopupWithForm
// для попапа редактирования профиля
const profilePopup = new PopupWithForm({
  popupSelector: '.popup_type_profile-edit',
  selectorsConfig: formSelectorsAndClasses,

  formSubmitHandler: (newProfileData) => {
    profileName.textContent = newProfileData.main;
    profileAbout.textContent = newProfileData.secondary;
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
  },
});

// Функция записи информации из профиля в поля ввода формы
function writeProfileDataIntoEditingForm() {
  profileFormName.value = profileName.textContent;
  profileFormAbout.value = profileAbout.textContent;
}

// Функция, открывающая попап с редактированием профиля
function openProfilePopup() {
  profilePopup.open();
  writeProfileDataIntoEditingForm();
  formValidators['info-editing-form'].resetValidation();
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

/* Функция, записывающая данные из формы профиля
  в сам профиль на странице и закрывающая этот попап */
// function writeEditFormDataIntoProfile() {
//   profileName.textContent = profileFormName.value;
//   profileAbout.textContent = profileFormAbout.value;
//   profilePopup.close();
// }

// function writeEditFormDataIntoProfile(profileFormName, profileFormAbout) {
//   profileName.textContent = profileFormName;
//   profileAbout.textContent = profileFormAbout;
// }

// Функция, добавляющая новую пользовательскую карточку на страницу
// function addNewCard() {
//   const userCardData = {
//     name: cardAddFormTitle.value,
//     imageLink: cardAddFormLink.value,
//   };

//   const newCardElement = new Card({ cardData: userCardData });

//   cardsList.prepend(newCardElement);
//   cardAddingForm.reset();

//   // отключаем кнопку сабмита после отправки формы
//   formValidators['card-adding-form'].disableSubmitButton();

//   cardAddingPopup.close();
// }

// cardAddingForm.addEventListener('submit', addNewCard);

// /* Функция, добавляющая карточки из начального массива.
//   Срабатывает при загрузке страницы */
// function renderInitialCards() {
//   initialCards.forEach((card) => {
//     const cardElement = createCard(card);
//     cardsList.append(cardElement);
//   });
// }
// renderInitialCards();

// Функция закрытия модальных попапов
// function closeModalPopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', pushEscClosePopup);
// }

// Функция, закрывающая открытый в данный момент попап по нажатию Esc
// function pushEscClosePopup(evt) {
//   if (evt.code === 'Escape') {
//     const popupOpenedNow = document.querySelector('.popup_opened');
//     closeModalPopup(popupOpenedNow);
//   }
// }

// Функция, добавляющая документу слушатель закрытия попапов по Esc
// function setEscEventListener() {
//   document.addEventListener('keydown', pushEscClosePopup);
// }

// Функция открытия модального попапа
// function openModalPopup(popup) {
//   popup.classList.add('popup_opened');
//   setEscEventListener();
// }

// Функция, открывающая попап с редактированием профиля
// function clickOpenProfilePopup() {
//   openModalPopup(profileEditingPopup);
//   writeProfileDataIntoEditingForm();
//   formValidators['info-editing-form'].resetValidation();
// }

// Функция обработки клика по карточке для Card.js
// function handleImageFullscreenPopup(name, pic) {
//   imagePopupTitle.textContent = name;
//   imagePopupPic.src = pic;
//   imagePopupPic.alt = name;

//   openModalPopup(imagePopup);
// }
