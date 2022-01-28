// Объявление всех переменных
const root = document.querySelector('.root');
const editForm = root.querySelector('.edit-form');
const addForm = root.querySelector('.edit-form_add');
const profile = root.querySelector('.profile');
const editPopup = root.querySelector('.popup_edit');
const addCardPopup = root.querySelector('.popup_add-card');
const imagePopup = root.querySelector('.popup_show-card');
const cardsContainer = root.querySelector('.cards-container');
const cardsTemplate = root.querySelector('.cards-template').content;

const cardsList = cardsContainer.querySelector('.grid-elements');

const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const editBttn = profile.querySelector('.profile__edit-button');
const addBttn = profile.querySelector('.profile__add-button');

const editFormName = editForm.querySelector('.edit-form__input_name');
const formAbout = editForm.querySelector('.edit-form__input_about');

const addFormTitle = addForm.querySelector('.edit-form__input_title');
const addFormLink = addForm.querySelector('.edit-form__input_link');

const closeBttnEditPopup = editPopup.querySelector('.popup__close-button');

const closeBttnAddPopup = addCardPopup.querySelector('.popup__close-button');

const closeBttnImagePopup = imagePopup.querySelector('.popup__close-button');

const imagePopupPic = imagePopup.querySelector('.popup__photo');
const imagePopupTitle = imagePopup.querySelector('.popup__image-title');

// Массив с начальными карточками
const initialCards = [
    {
        name: 'Карачаевск',
        imageLink: 'images/cards/card__photo-1.jpg',
    },
    {
        name: 'Гора Эльбрус',
        imageLink: 'images/cards/card__photo-2.jpg',
    },
    {
        name: 'Домбай',
        imageLink: 'images/cards/card__photo-3.jpg',
    },
    {
        name: 'Челябинск',
        imageLink: 'images/cards/card__photo-4.jpg',
    },
    {
        name: 'Ивановская область',
        imageLink: 'images/cards/card__photo-5.jpg',
    },
    {
        name: 'Шерегеш',
        imageLink: 'images/cards/card__photo-6.jpg',
    },
];




// Функция записи информации из профиля в поля ввода формы
function writeProfileInfoToForm() {
    editFormName.value = profileName.textContent;
    formAbout.value = profileAbout.textContent;
}
writeProfileInfoToForm();

// Функция открытия модального попапа 
function openModalPopup(popup) {
    popup.classList.add('popup_opened');
}

// Функции открытия модальных попапов по клику на их
function clickDisplayEditPopup() {
    openModalPopup(editPopup);
}

function clickDisplayAddPopup() {
    openModalPopup(addCardPopup);
}

// Функция закрытия модальных попапов
function closeModalPopup(popup) {
    popup.classList.remove('popup_opened');
}

// Функции закрытия модальных попапов по клику на крестик
function clickCloseEditPopup() {
    closeModalPopup(editPopup);
}

function clickCloseAddPopup() {
    closeModalPopup(addCardPopup);
}

function clickCloseImagePopup() {
    closeModalPopup(imagePopup);
}

// Функция редактирования информации через форму
function submitEditingInfo() {    
    profileName.textContent = editFormName.value;
    profileAbout.textContent = formAbout.value;
    closeModalPopup(editPopup);
}

// Функция открытия попапа изображения
function openImagePopup(image, name) {
    imagePopupPic.src = image;
    imagePopupPic.alt = name;
    imagePopupTitle.textContent = name;
    openModalPopup(imagePopup);
}

// Функция рендеринга карточек из массива, срабатывающая при загрузке страницы
function renderCards() {
    initialCards.forEach(card => {
        const initialCard = getAddedCardElement(card.name, card.imageLink);
        cardsList.append(initialCard);
    });
}
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
    addedCardLikeButton.addEventListener('click', (evt) => evt.target.classList.toggle('card__like-button_active'));

    // Делаем карточку удаляемой
    addedCardDeleteButton.addEventListener('click', (evt) => evt.target.closest('.grid-elements__item').remove());

    // Добавляем возможность открывать фото из добавленной карточки в фуллскрин
    addedCardPic.addEventListener('click', () => openImagePopup(link, name));

    return addedCard;
}

// Функция, добавляющая новую карточку на страницу
function addNewCard() {
    const newCardElement = getAddedCardElement(addFormTitle.value, addFormLink.value);
    cardsList.prepend(newCardElement);
    closeModalPopup(addCardPopup);
}

// Слушатели
editBttn.addEventListener('click', clickDisplayEditPopup);

editForm.addEventListener('submit', submitEditingInfo);

addBttn.addEventListener('click', clickDisplayAddPopup);

addForm.addEventListener('submit', addNewCard);

closeBttnEditPopup.addEventListener('click', clickCloseEditPopup);
closeBttnAddPopup.addEventListener('click', clickCloseAddPopup);
closeBttnImagePopup.addEventListener('click', clickCloseImagePopup);

document.addEventListener('keydown', function(evt) {
    if (evt.code === 'Escape') {
        closeModalPopup(editPopup);
        closeModalPopup(addCardPopup);
        closeModalPopup(imagePopup);
    }
});