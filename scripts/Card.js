// Импорты
import { openModalPopup } from './index.js';

export class Card {
  constructor(cardData, cardSelector) {
    this._cardSelector = cardSelector;
    this._cardName = cardData.name;
    this._cardPic = cardData.imageLink;
  }

  _getCardTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.querySelector('.grid-elements__item')
      .cloneNode(true);

    return cardTemplate;
  }

  _handleLikeButton(evt) {
    evt.target.classList.toggle('card__like-button_active');
  }

  _handleCardRemoval(evt) {
    evt.target.closest('.grid-elements__item').remove();
  }

  _handleImageFullscreenPopup() {
    const imagePopup = document.querySelector('.popup_type_opened-card');
    const imagePopupPic = imagePopup.querySelector('.popup__photo');
    const imagePopupTitle = imagePopup.querySelector('.popup__image-title');

    imagePopupPic.src = this._cardPic;
    imagePopupPic.alt = this._cardName;
    imagePopupTitle.textContent = this._cardName;

    openModalPopup(imagePopup);
  }

  _setEventListeners() {
    // Слушатель кнопки лайка
    this._element
      .querySelector('.card__like-button')
      .addEventListener('click', (evt) => {
        this._handleLikeButton(evt);
      });

    // Слушатель кнопки удаления карточки
    this._element
      .querySelector('.card__delete-button')
      .addEventListener('click', (evt) => {
        this._handleCardRemoval(evt);
      });

    /* Слушатель на изображение в карточке
      для открытия фулскрин попапа */
    this._element
      .querySelector('.card__photo')
      .addEventListener('click', () => {
        this._handleImageFullscreenPopup();
      });
  }

  createCard() {
    this._element = this._getCardTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__name').textContent = this._cardName;
    this._element.querySelector('.card__photo').alt = this._cardName;
    this._element.querySelector('.card__photo').src = this._cardPic;

    return this._element;
  }
}
