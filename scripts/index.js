// Объявление всех переменных
const root = document.querySelector('.root');
const profileEditingForm = root.querySelector('.edit-form_type_profile-edit');
const cardAddingForm = root.querySelector('.edit-form_type_add-card');
const profile = root.querySelector('.profile');
const profileEditingPopup = root.querySelector('.popup_type_profile-edit');
const cardAddingPopup = root.querySelector('.popup_type_add-card');
const imagePopup = root.querySelector('.popup_type_opened-card');
const cardsContainer = root.querySelector('.cards-container');
const cardsTemplate = root.querySelector('.cards-template').content;

const cardsList = cardsContainer.querySelector('.grid-elements');

const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const profileEditingBttn = profile.querySelector('.profile__edit-button');
const profileAddBttn = profile.querySelector('.profile__add-button');

const profileFormName = profileEditingForm.querySelector('.edit-form__input_type_name');
const profileFormAbout = profileEditingForm.querySelector('.edit-form__input_type_about');

const buttonElement = profileEditingForm.querySelector('.edit-form__submit-button');

const cardAddFormTitle = cardAddingForm.querySelector('.edit-form__input_type_title');
const cardAddFormLink = cardAddingForm.querySelector('.edit-form__input_type_link');

const profilePopupCloseBttn = profileEditingPopup.querySelector('.popup__close-button');

const cardPopupCloseBttn = cardAddingPopup.querySelector('.popup__close-button');

const closeBttnImagePopup = imagePopup.querySelector('.popup__close-button');

const imagePopupPic = imagePopup.querySelector('.popup__photo');
const imagePopupTitle = imagePopup.querySelector('.popup__image-title');

/* Созданное глобально событие, имитирующее инпут
Нужно для того, чтобы вызвать его в функции открытия попапа профиля */
const inputEvent = new KeyboardEvent('input');


// Функция записи информации из профиля в поля ввода формы
function writeProfileDataIntoEditingForm() {
    profileFormName.value = profileName.textContent;
    profileFormAbout.value = profileAbout.textContent;
};

// Функция открытия модального попапа 
function openModalPopup(popup) {
    popup.classList.add('popup_opened');
    setEscEventListener();
};

// Функция, открывающая попап с редактированием профиля
function clickOpenProfilePopup() {
    openModalPopup(profileEditingPopup);
    writeProfileDataIntoEditingForm();
    enableSubmitButton(buttonElement, formSelectorsAndClasses);

    /* Проблема: если во время редактирования попапа профиля получить ошибку, 
    затем не сохранять форму, а просто закрыть ее и потом снова открыть, 
    то в форму запишутся данные из профиля, но ошибка о 
    невалидности останется. Как только произойдет событие инпут,
    все встанет на свои места, но до этого момента мы будем
    иметь ситуацию, когда форма валидна, но ошибка при этом видна

    Решение: во время открытия попапа профиля имитировать 
    ранее созданное событие инпут, которое запустит функцию
    валидации. Таким образом не будет возникать ошибка о невалидности
    при валидной форме и не нужно будет отдельно вызывать функцию
    enableValidation внутри функции открытия попапа */
    profileFormName.dispatchEvent(inputEvent);
    profileFormAbout.dispatchEvent(inputEvent);
};

// Функция, открывающая попап добавления новой карточки
function clickOpenCardAddingPopup() {
    openModalPopup(cardAddingPopup);
};

// Функция закрытия модальных попапов
function closeModalPopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', pushEscClosePopup);
};

// Отдельные функции закрытия для каждого из модальных попапов
function clickCloseProfilePopup() {
    closeModalPopup(profileEditingPopup);
};

function clickCloseCardAddingPopup() {
    closeModalPopup(cardAddingPopup);
};

function clickCloseImagePopup() {
    closeModalPopup(imagePopup);
};

/* Функция, записывающая данные из формы профиля
в сам профиль на странице и закрывающая этот попап */
function writeProfileEditingFormDataIntoProfile() {    
    profileName.textContent = profileFormName.value;
    profileAbout.textContent = profileFormAbout.value;
    closeModalPopup(profileEditingPopup);
};

// Функция открытия попапа изображения
function openImagePopup(image, name) {
    imagePopupPic.src = image;
    imagePopupPic.alt = name;
    imagePopupTitle.textContent = name;
    openModalPopup(imagePopup);
};

/* Функция, которая создает карточку
сразу со всеми слушателями на ней */
function createCard(name, link) {
    const card = cardsTemplate.querySelector('.grid-elements__item').cloneNode(true);
    const cardName = card.querySelector('.card__name');
    const cardPic = card.querySelector('.card__photo');
    const cardLikeButton = card.querySelector('.card__like-button');
    const cardDeleteButton = card.querySelector('.card__delete-button');

    // Наполняем карточку контентом
    cardName.textContent = name;
    cardPic.src = link;
    cardPic.alt = name;

    // Делаем карточку лайкабельной
    cardLikeButton.addEventListener('click', function(evt) {
        evt.target.classList.toggle('card__like-button_active');
    });

    // Делаем карточку удаляемой
    cardDeleteButton.addEventListener('click', function(evt) {
        evt.target.closest('.grid-elements__item').remove();
    });

    // Добавляем возможность открывать фото карточки в фуллскрин
    cardPic.addEventListener('click', () => openImagePopup(link, name));

    const preparedCard = card;
    return preparedCard;
};

/* Функция, добавляющая карточки из начального массива. 
Срабатывает при загрузке страницы */
function renderInitialCards() {
    initialCards.forEach(card => {
        const initialCard = createCard(card.name, card.imageLink);
        cardsList.append(initialCard);
    });
};
renderInitialCards();

// Функция, добавляющая новую пользовательскую карточку на страницу
function addNewCard(evt) {
    const newCardElement = createCard(cardAddFormTitle.value, cardAddFormLink.value);

    // находим *нужную* кнопку сабмита именно в той форме, которую отправили
    const buttonElement = Array.from(evt.target.children).find(element => {
        return element.classList.contains('edit-form__submit-button');
    });
    
    cardsList.prepend(newCardElement);
    cardAddingForm.reset();

    // отключаем кнопку сабмита после отправки формы
    disableSubmitButton(buttonElement, formSelectorsAndClasses);

    closeModalPopup(cardAddingPopup);
};

// Функция, закрывающая открытый на данный момент попап по клику на оверлей
function clickOverlayClosePopup(evt) {
    if (
        evt.target.classList.contains('popup_opened')
    ) {
        const popupOpenedNow = root.querySelector('.popup_opened');
        closeModalPopup(popupOpenedNow);
    }
};

// Функция, закрывающая открытый на данный момент попап по нажатию Esc
function pushEscClosePopup(evt) {
    if (evt.code === 'Escape') {
        const popupOpenedNow = root.querySelector('.popup_opened');
        closeModalPopup(popupOpenedNow);
    }
};

// Функция, добавляющая документу слушатель закрытия попапов по Esc
function setEscEventListener() {
    document.addEventListener('keydown', pushEscClosePopup);
};




// Добавление слушателей
profileEditingBttn.addEventListener('click', clickOpenProfilePopup);

profileEditingForm.addEventListener('submit', writeProfileEditingFormDataIntoProfile);

profileAddBttn.addEventListener('click', clickOpenCardAddingPopup);

/* В evt функции addNewCard отправится форма, из которой
уже внутри этой функции мы получим нужную кнопку сабмита */
cardAddingForm.addEventListener('submit', addNewCard);

profilePopupCloseBttn.addEventListener('click', clickCloseProfilePopup);
cardPopupCloseBttn.addEventListener('click', clickCloseCardAddingPopup);
closeBttnImagePopup.addEventListener('click', clickCloseImagePopup);

profileEditingPopup.addEventListener('click', clickOverlayClosePopup);
cardAddingPopup.addEventListener('click', clickOverlayClosePopup);
imagePopup.addEventListener('click', clickOverlayClosePopup);