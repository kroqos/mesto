// Объявление всех переменных
const root = document.querySelector('.root');
const editForm = root.querySelector('.edit-form');
const profile = root.querySelector('.profile');
const editPopup = root.querySelector('.popup_edit');
const addCardPopup = root.querySelector('.popup_add-card');
const cardsContainer = root.querySelector('.cards-container');
const cardsTemplate = root.querySelector('.cards-template').content;

const cardsSection = cardsTemplate.querySelector('.cards').cloneNode(false);
const cardsList = cardsTemplate.querySelector('.grid-elements').cloneNode(false);

const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__about');
const editBttn = profile.querySelector('.profile__edit-button');
const addBttn = profile.querySelector('.profile__add-button');

const formName = editForm.querySelector('.edit-form__input_name');
const formAbout = editForm.querySelector('.edit-form__input_about');

const closeBttn = editPopup.querySelector('.popup__close-button');

const closeBttnAddPopup = addCardPopup.querySelector('.popup__close-button');

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

// Функция рендеринга первых 6 карточек в массиве, срабатывающая при загрузке страницы
function renderCards() {
    initialCards.forEach(card => {
        const cardElement = cardsTemplate.querySelector('.grid-elements__item').cloneNode(true);
        cardElement.querySelector('.card__name').textContent = card.name;
        cardElement.querySelector('.card__photo').src = card.imageLink;
        cardElement.querySelector('.card__photo').alt = card.imageAlt;
        cardsContainer.append(cardsSection);
        cardsSection.append(cardsList);
        cardsList.append(cardElement);
    });
};
renderCards();

// Функция записи информации из профиля в поля ввода формы
function writeProfileInfoToForm() {
    formName.value = profileName.textContent;
    formAbout.value = profileAbout.textContent;
}


// Функции открытия и закрытия попапа редактирования профиля
function openEditPopup() {
    editPopup.classList.add('popup_opened');
    writeProfileInfoToForm();
}

function closeEditPopup() {
    editPopup.classList.remove('popup_opened');
}

// Функции открытия и закрытия попапа добавления карточки
function openAddPopup() {
    addCardPopup.classList.add('popup_opened');
}

function closeAddPopup() {
    addCardPopup.classList.remove('popup_opened');
}

// Функция редактирование информации через форму
function submitEditingInfo(evt) {
    evt.preventDefault();
    
    profileName.textContent = formName.value;
    profileAbout.textContent = formAbout.value;
    closeEditPopup();
}



// Слушатели
editBttn.addEventListener('click', openEditPopup);

editForm.addEventListener('submit', submitEditingInfo);

closeBttn.addEventListener('click', closeEditPopup);

document.addEventListener('keydown', function(event) {
    if (event.code === 'Escape') {
        closeEditPopup();
        closeAddPopup();
    }
});

addBttn.addEventListener('click', openAddPopup);

closeBttnAddPopup.addEventListener('click', closeAddPopup);