// Объявление всех переменных
const root = document.querySelector('.root');
const editForm = root.querySelector('.edit-form');
const addForm = root.querySelector('.edit-form_add');
const profile = root.querySelector('.profile');
const editPopup = root.querySelector('.popup_edit');
const addCardPopup = root.querySelector('.popup_add-card');
const imagePopup = root.querySelector('.image-popup');
const cardsContainer = root.querySelector('.cards-container');
const cardsTemplate = root.querySelector('.cards-template').content;

const cardsSection = cardsTemplate.querySelector('.cards').cloneNode(false);
const cardsList = cardsTemplate.querySelector('.grid-elements').cloneNode(false);

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

const closeBttnImagePopup = imagePopup.querySelector('.image-popup__close-button');

// Массив с начальными карточками
const initialCards = [
    {
        name: 'Карачаевск',
        imageLink: 'images/cards/card__photo-1.jpg',
        imageAlt: 'фотография полуразрушенной церкви в Карачаево-Черкесии',
    },
    {
        name: 'Гора Эльбрус',
        imageLink: 'images/cards/card__photo-2.jpg',
        imageAlt: 'фотография далекой горы Эльбрус',
    },
    {
        name: 'Домбай',
        imageLink: 'images/cards/card__photo-3.jpg',
        imageAlt: 'фотография горы Домбай',
    },
    {
        name: 'Челябинск',
        imageLink: 'images/cards/card__photo-4.jpg',
        imageAlt: 'фотография зимней равнины с высокими деревьями',
    },
    {
        name: 'Ивановская область',
        imageLink: 'images/cards/card__photo-5.jpg',
        imageAlt: 'фотография небольшого полуострова в туманном водоеме',
    },
    {
        name: 'Шерегеш',
        imageLink: 'images/cards/card__photo-6.jpg',
        imageAlt: 'фото зимнего склона с высокими елями',
    },
];

// Функция закрытия попапа изображения
function closeImagePopup(closeButton) {
    closeButton.addEventListener('click', function() {
        imagePopup.classList.remove('image-popup_opened');
    });

    document.addEventListener('keydown', function(evt) {
        if (evt.code === 'Escape') {
            imagePopup.classList.remove('image-popup_opened');
        }
    });
}

// Функция открытия и закрытия попапа изображения
function openAndCloseImagePopup(photo) {
    photo.addEventListener('click', function(evt) {
        const image = imagePopup.querySelector('.image-popup__photo');
        const title = imagePopup.querySelector('.image-popup__title');
        
        imagePopup.classList.add('image-popup_opened');
        image.src = evt.target.src;
        image.alt = evt.target.alt;
        title.textContent = evt.target.closest('.card').querySelector('.card__name').textContent;

        closeImagePopup(closeBttnImagePopup);
    });
}

// Функция рендеринга карточек из массива, срабатывающая при загрузке страницы
function renderCards() {
    initialCards.forEach(card => {
        const cardElement = cardsTemplate.querySelector('.grid-elements__item').cloneNode(true);
        const cardPic = cardElement.querySelector('.card__photo');
        const cardLikeButton = cardElement.querySelector('.card__like-button');
        const cardDeleteButton = cardElement.querySelector('.card__delete-button');

        cardElement.querySelector('.card__name').textContent = card.name;
        cardPic.src = card.imageLink;
        cardPic.alt = card.imageAlt;
        cardsContainer.append(cardsSection);
        cardsSection.append(cardsList);
        cardsList.append(cardElement);
        
        // Делаем начальные карточки лайкабельными
        cardLikeButton.addEventListener('click', (evt) => evt.target.classList.toggle('card__like-button_active'));

        // Делаем начальные карточки удаляемыми
        cardDeleteButton.addEventListener('click', (evt) => evt.target.closest('.grid-elements__item').remove());

        // Добавляем возможность открывать и закрывать фото
        openAndCloseImagePopup(cardPic);
    });
}
renderCards();

// Функция записи информации из профиля в поля ввода формы
function writeProfileInfoToForm() {
    editFormName.value = profileName.textContent;
    formAbout.value = profileAbout.textContent;
}

// Функция открытия модального попапа 
function openModalPopup(popup) {
    popup.classList.add('popup_opened');
}

// Функции открытия модальных попапов по клику на их
function clickDisplayEditPopup() {
    openModalPopup(editPopup);
    writeProfileInfoToForm();
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

// Функция редактирования информации через форму
function submitEditingInfo(evt) {
    evt.preventDefault();
    
    profileName.textContent = editFormName.value;
    profileAbout.textContent = formAbout.value;
    closeModalPopup(editPopup);
}

// Функция рендеринга добавленной карточки
// function renderAddedCard() {
//     const addedCard = cardsTemplate.querySelector('.grid-elements__item').cloneNode(true);
//     addedCard.querySelector('.card__name').textContent = addedCards[addedCards.length - 1].name;
//     addedCard.querySelector('.card__photo').src = addedCards[addedCards.length - 1].imageLink;
//     addedCard.querySelector('.card__photo').alt = addedCards[addedCards.length - 1].imageAlt;
//     cardsList.prepend(addedCard);

//     // Делаем каждую добавляемую карточку лайкабельной
//     const addedCardLikeButton = addedCard.querySelector('.card__like-button');
//     makeCardLikeable(addedCardLikeButton);

//     // Делаем каждую добавляемую карточку удаляемой
//     const addedCardDeleteButton = addedCard.querySelector('.card__delete-button');
//     deleteCard(addedCardDeleteButton);

//     // Создаем возможность открывать и закрывать добавляемые карточки
//     const addedCardPhoto = addedCard.querySelector('.card__photo');
//     openAndCloseImagePopup(addedCardPhoto);
// }

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
    addedCardPic.alt = "изображение";

    // Делаем карточку лайкабельной
    addedCardLikeButton.addEventListener('click', (evt) => evt.target.classList.toggle('card__like-button_active'));

    // Делаем карточку удаляемой
    addedCardDeleteButton.addEventListener('click', (evt) => evt.target.closest('.grid-elements__item').remove());

    return addedCard;
}

// Функция, добавляющая новую карточку на страницу
function addNewCard(evt) {
    evt.preventDefault();

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

document.addEventListener('keydown', function(evt) {
    if (evt.code === 'Escape') {
        closeModalPopup(editPopup);
        closeModalPopup(addCardPopup);
    }
});