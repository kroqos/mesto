export default class Card {
  constructor({ cardData, cardSelector, imageClickHandler }) {
    this._cardElement = document.querySelector(cardSelector);
    this._cardName = cardData.main;
    this._cardPic = cardData.secondary;

    this._imageClickHandler = imageClickHandler;
  }

  _getCardTemplate() {
    const cardTemplate = this._cardElement.content
      .querySelector('.grid-elements__item')
      .cloneNode(true);

    return cardTemplate;
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle('card__like-button_active');
  }

  _handleCardRemoval() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    // Слушатель кнопки лайка
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButton();
    });

    // Слушатель кнопки удаления карточки
    this._element
      .querySelector('.card__delete-button')
      .addEventListener('click', () => {
        this._handleCardRemoval();
      });

    /* Слушатель на изображение в карточке
      для открытия фулскрин попапа */
    this._cardImage.addEventListener('click', () => {
      this._imageClickHandler(this._cardName, this._cardPic);
    });
  }

  createCard() {
    this._element = this._getCardTemplate();
    this._cardImage = this._element.querySelector('.card__photo');
    this._likeButton = this._element.querySelector('.card__like-button');
    this._setEventListeners();

    this._element.querySelector('.card__name').textContent = this._cardName;
    this._cardImage.alt = this._cardName;
    this._cardImage.src = this._cardPic;

    return this._element;
  }
}