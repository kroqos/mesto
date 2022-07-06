export default class Card {
  constructor({ cardData, cardSelector, imageClickHandler }) {
    this._cardElement = document.querySelector(cardSelector);
    this._cardName = cardData.name;
    this._cardPic = cardData.link;
    this._cardOwnerId = cardData.owner._id;
    this._cardLikesNumber = cardData.likes.length;

    this._imageClickHandler = imageClickHandler;

    this.cardId = cardData._id;
  }

  _getCardTemplate() {
    const cardTemplate = this._cardElement.content
      .querySelector('.grid-elements__item')
      .cloneNode(true);

    return cardTemplate;
  }

  _updateLikeCounterState() {
    if (this._cardLikeCounter.textContent != '0') {
      this._cardLikeCounter.style.display = 'block';
    } else {
      this._cardLikeCounter.style.display = 'none';
    }
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle('card__like-button_active');
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  setTrashIconClickHandler(handler) {
    this._openConfirmationPopup = handler;
  }

  _setEventListeners() {
    // Слушатель кнопки лайка
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButton();
      this._updateLikeCounterState();
    });

    // Слушатель кнопки удаления карточки
    this._element
      .querySelector('.card__delete-button')
      .addEventListener('click', () => {
        this._openConfirmationPopup();
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
    this._deleteButton = this._element.querySelector('.card__delete-button');
    this._cardLikeCounter = this._element.querySelector('.card__like-counter');
    if (this._cardOwnerId === '08798098c741c1c90dadf44f') {
      this._deleteButton.style.display = 'block';
    }
    this._setEventListeners();

    this._element.querySelector('.card__name').textContent = this._cardName;
    this._cardImage.alt = this._cardName;
    this._cardImage.src = this._cardPic;
    this._cardLikeCounter.textContent = this._cardLikesNumber;
    this._updateLikeCounterState();

    return this._element;
  }
}
