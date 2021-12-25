let root = document.querySelector('.root');

// Запись в поля ввода формы информации из профиля
let profileName = root.querySelector('.profile__name');
let profileAbout = root.querySelector('.profile__about');
let formName = root.querySelector('.edit-form__name');
let formAbout = root.querySelector('.edit-form__about');

formName.value = profileName.textContent;
formAbout.value = profileAbout.textContent;
// Конец блока

// Блок для открытия и закрытия попапа
let editBttn = root.querySelector('.profile__edit-button');
let closeBttn = root.querySelector('.popup__close-button');
let popup = root.querySelector('.popup');

function popupOpen() {
    popup.classList.add('popup_opened');
    root.classList.add('root_no-scroll');
}

editBttn.addEventListener('click', popupOpen);


function popupClose() {
    popup.classList.remove('popup_opened');
    root.classList.remove('root_no-scroll');
}

closeBttn.addEventListener('click', popupClose);
document.addEventListener('keydown', function(event) {
    if (event.code === 'Escape') {
        popupClose();
    }
});
// Конец блока