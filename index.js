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

const cardAddFormTitle = cardAddingForm.querySelector('.edit-form__input_type_title');
const cardAddFormLink = cardAddingForm.querySelector('.edit-form__input_type_link');

const profilePopupCloseBttn = profileEditingPopup.querySelector('.popup__close-button');

const cardPopupCloseBttn = cardAddingPopup.querySelector('.popup__close-button');

const closeBttnImagePopup = imagePopup.querySelector('.popup__close-button');

const imagePopupPic = imagePopup.querySelector('.popup__photo');
const imagePopupTitle = imagePopup.querySelector('.popup__image-title');




// Функция записи информации из профиля в поля ввода формы
function writeProfileInfoToForm() {
    profileFormName.value = profileName.textContent;
    profileFormAbout.value = profileAbout.textContent;
};
writeProfileInfoToForm();

// Функция открытия модального попапа 
function openModalPopup(popup) {
    popup.classList.add('popup_opened');
    setEscEventListener();
};

// Функции открытия модальных попапов по клику на их
function clickDisplayProfilePopup() {
    openModalPopup(profileEditingPopup);
    writeProfileInfoToForm();
};

function clickDisplayCardAddPopup() {
    openModalPopup(cardAddingPopup);
};

// Функция закрытия модальных попапов
function closeModalPopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', pushEscClosePopup);
    document.removeEventListener('click', clickOverlayClosePopup);
};

// Функции закрытия модальных попапов по клику на крестик
function clickCloseProfilePopup() {
    closeModalPopup(profileEditingPopup);
};

function clickCloseCardAddingPopup() {
    closeModalPopup(cardAddingPopup);
};

function clickCloseImagePopup() {
    closeModalPopup(imagePopup);
};

// Функция редактирования информации через форму
function submitEditingInfo() {    
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

// Функция рендеринга карточек из массива, срабатывающая при загрузке страницы
function renderCards() {
    initialCards.forEach(card => {
        const initialCard = getAddedCardElement(card.name, card.imageLink);
        cardsList.append(initialCard);
    });
};
renderCards();

// Функция, возвращающая новую карточку с пользовательскими данными
function getAddedCardElement(name, link) {
    const addedCard = cardsTemplate.querySelector('.grid-elements__item').cloneNode(true);
    const addedCardName = addedCard.querySelector('.card__name');
    const addedCardPic = addedCard.querySelector('.card__photo');
    const addedCardLikeButton = addedCard.querySelector('.card__like-button');
    const addedCardDeleteButton = addedCard.querySelector('.card__delete-button');

    // Наполняем контентом новую карточку
    addedCardName.textContent = name;
    addedCardPic.src = link;
    addedCardPic.alt = name;

    // Делаем карточку лайкабельной
    addedCardLikeButton.addEventListener('click', function(evt) {
        evt.target.classList.toggle('card__like-button_active');
    });

    // Делаем карточку удаляемой
    addedCardDeleteButton.addEventListener('click', function(evt) {
        evt.target.closest('.grid-elements__item').remove();
    });

    // Добавляем возможность открывать фото из добавленной карточки в фуллскрин
    addedCardPic.addEventListener('click', () => openImagePopup(link, name));

    return addedCard;
}

// Функция, добавляющая новую карточку на страницу
function addNewCard() {
    const newCardElement = getAddedCardElement(cardAddFormTitle.value, cardAddFormLink.value);
    cardsList.prepend(newCardElement);
    closeModalPopup(cardAddingPopup);
}

// Функция, закрывающая любой из попапов по клику на оверлей
function clickOverlayClosePopup(evt) {
    if (
        !evt.target.closest('.popup__container') && 
        !evt.target.closest('.popup__image-container') && 
        !evt.target.classList.contains('popup__close-button')
    ) {
        clickCloseProfilePopup();
        clickCloseCardAddingPopup();
        clickCloseImagePopup();
    }
};

// Функция, закрывающая текущий открытый попап
function pushEscClosePopup(evt) {
    const currentlyOpenedPopup = root.querySelector('.popup_opened');

    if (evt.code === 'Escape') {
        closeModalPopup(currentlyOpenedPopup);
    }
};

// Функция добавления слушателя закрытия попапов по Esc
function setEscEventListener() {
    document.addEventListener('keydown', pushEscClosePopup);
};




// Слушатели
profileEditingBttn.addEventListener('click', clickDisplayProfilePopup);

profileEditingForm.addEventListener('submit', submitEditingInfo);

profileAddBttn.addEventListener('click', clickDisplayCardAddPopup);

cardAddingForm.addEventListener('submit', addNewCard);

profilePopupCloseBttn.addEventListener('click', clickCloseProfilePopup);
cardPopupCloseBttn.addEventListener('click', clickCloseCardAddingPopup);
closeBttnImagePopup.addEventListener('click', clickCloseImagePopup);

document.addEventListener('click', function(evt) {
    if (evt.target === profileEditingBttn || evt.target === profileAddBttn || evt.target.classList.contains('card__photo')) {
        document.addEventListener('click', clickOverlayClosePopup);
    }
});
