export default class Card {
  constructor({
    cardData,
    cardSelector,
    userId,
    imageClickHandler,
    likeHandler,
    removeLikeHandler,
  }) {
    this._cardElement = document.querySelector(cardSelector);
    this._cardName = cardData.name;
    this._cardPic = cardData.link;
    this._cardOwnerId = cardData.owner._id;
    this._cardLikes = cardData.likes;
    this._userId = userId;

    this._imageClickHandler = imageClickHandler;
    this._likeHandler = likeHandler;
    this._removeLikeHandler = removeLikeHandler;

    this.cardId = cardData._id;
  }

  _getCardTemplate() {
    const cardTemplate = this._cardElement.content
      .querySelector('.grid-elements__item')
      .cloneNode(true);

    return cardTemplate;
  }

  _updateLikeCounterState(cardLikeCounter, cardLikesArrayLength) {
    if (cardLikeCounter.textContent != '0' || cardLikesArrayLength >= 1) {
      cardLikeCounter.style.display = 'block';
    } else {
      cardLikeCounter.style.display = 'none';
    }
  }

  _checkIfCardIsLiked(likes) {
    return likes.some((likeElement) => {
      if (likeElement._id === this._userId) {
        return true;
      }
    });
  }

  _handleLikeButton() {
    if (!this._checkIfCardIsLiked(this._cardLikes)) {
      this._likeHandler()
        .then((likesObject) => {
          this._cardLikes = likesObject.likes;
          return this._cardLikes;
        })
        .then((likesArray) => {
          this._cardLikeCounter.textContent = likesArray.length;
          this._updateLikeCounterState(
            this._cardLikeCounter,
            likesArray.length
          );
        })
        .then(() => this._likeButton.classList.add('card__like-button_active'))
        .catch((err) => console.error(err));
    } else {
      this._removeLikeHandler()
        .then((likesObject) => {
          this._cardLikes = likesObject.likes;
          return this._cardLikes;
        })
        .then((likesArray) => {
          this._cardLikeCounter.textContent = likesArray.length;
          this._updateLikeCounterState(
            this._cardLikeCounter,
            likesArray.length
          );
        })
        .then(() =>
          this._likeButton.classList.remove('card__like-button_active')
        )
        .catch((err) => console.error(err));
    }
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
        this._openConfirmationPopup();
      });

    /* Слушатель на изображение в карточке
      для открытия фулскрин попапа */
    this._cardImage.addEventListener('click', () => {
      this._imageClickHandler(this._cardName, this._cardPic);
    });
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  setTrashIconClickHandler(handler) {
    this._openConfirmationPopup = handler;
  }

  createCard() {
    this._element = this._getCardTemplate();
    this._cardImage = this._element.querySelector('.card__photo');
    this._likeButton = this._element.querySelector('.card__like-button');
    this._deleteButton = this._element.querySelector('.card__delete-button');
    this._cardLikeCounter = this._element.querySelector('.card__like-counter');

    if (this._cardOwnerId === this._userId) {
      this._deleteButton.style.display = 'block';
    }

    if (this._checkIfCardIsLiked(this._cardLikes)) {
      this._likeButton.classList.add('card__like-button_active');
    }

    this._setEventListeners();

    this._element.querySelector('.card__name').textContent = this._cardName;
    this._cardImage.alt = this._cardName;
    this._cardImage.src = this._cardPic;
    this._cardLikeCounter.textContent = this._cardLikes.length;
    this._updateLikeCounterState(this._cardLikeCounter);

    return this._element;
  }
}
