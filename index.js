let root = document.querySelector('.root');

// Функция записи информации из профиля в поля ввода формы
let profileName = root.querySelector('.profile__name');
let profileAbout = root.querySelector('.profile__about');
let formName = root.querySelector('.edit-form__input_name');
let formAbout = root.querySelector('.edit-form__input_about');

function profileInfoToForm() {
    formName.value = profileName.textContent;
    formAbout.value = profileAbout.textContent;
}
// Конец блока



// Открытие и закрытие попапа
let editBttn = root.querySelector('.profile__edit-button');
let closeBttn = root.querySelector('.popup__close-button');
let popup = root.querySelector('.popup');

function popupOpen() {
    popup.classList.add('popup_opened');
    root.classList.add('root_no-scroll');
    profileInfoToForm();
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



// Редактирование информации через форму

let editForm = root.querySelector('.edit-form');

function submitEditingInfo(evt) {
    evt.preventDefault();
    
    profileName.textContent = formName.value;
    profileAbout.textContent = formAbout.value;
    popupClose();
}

editForm.addEventListener('submit', submitEditingInfo);
// Конец блока