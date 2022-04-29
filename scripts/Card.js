export class Card {
  constructor(cardData, cardSelector, handleImageFullscreenPopup) {
    this._cardSelector = cardSelector;
    this._cardName = cardData.name;
    this._cardPic = cardData.imageLink;
    this._handleImageFullscreenPopup = handleImageFullscreenPopup;
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
    this._cardImage.addEventListener('click', () => {
      this._handleImageFullscreenPopup(this._cardName, this._cardPic);
    });
  }

  createCard() {
    this._element = this._getCardTemplate();
    this._cardImage = this._element.querySelector('.card__photo');
    this._setEventListeners();

    this._element.querySelector('.card__name').textContent = this._cardName;
    this._cardImage.alt = this._cardName;
    this._cardImage.src = this._cardPic;

    return this._element;
  }
}
