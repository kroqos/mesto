// Объявление всех переменных
let root = document.querySelector('.root');
let editForm = root.querySelector('.edit-form');
let profile = root.querySelector('.profile');
let popup = root.querySelector('.popup');

let profileName = profile.querySelector('.profile__name');
let profileAbout = profile.querySelector('.profile__about');
let editBttn = profile.querySelector('.profile__edit-button');

let formName = editForm.querySelector('.edit-form__input_name');
let formAbout = editForm.querySelector('.edit-form__input_about');

let closeBttn = popup.querySelector('.popup__close-button');



// Функция записи информации из профиля в поля ввода формы
function writeProfileInfoToForm() {
    formName.value = profileName.textContent;
    formAbout.value = profileAbout.textContent;
}


// Функции открытия и закрытия попапа
function openPopup() {
    popup.classList.add('popup_opened');
    writeProfileInfoToForm();
}

function closePopup() {
    popup.classList.remove('popup_opened');
}


// Функция редактирование информации через форму
function submitEditingInfo(evt) {
    evt.preventDefault();
    
    profileName.textContent = formName.value;
    profileAbout.textContent = formAbout.value;
    closePopup();
}



// Слушатели
editBttn.addEventListener('click', openPopup);

editForm.addEventListener('submit', submitEditingInfo);

closeBttn.addEventListener('click', closePopup);
document.addEventListener('keydown', function(event) {
    if (event.code === 'Escape') {
        closePopup();
    }
});