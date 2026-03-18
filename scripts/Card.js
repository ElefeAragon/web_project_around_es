export default class Card {
  constructor(
    data,
    templateSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick,
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._isLiked = false;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getId() {
    return this._id;
  }

  isLiked() {
    return this._isLiked;
  }

  setLikes(likes) {
    this._isLiked = likes.some((like) => like._id === this._id);

    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_is-active");
    } else {
      this._likeButton.classList.remove("card__like-button_is-active");
    }

    this._likeCount.textContent = likes.length;
  }

  handleDeleteClick() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });

    this._image.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }
  generateCard() {
    this._element = this._getTemplate();

    this._image = this._element.querySelector(".card__image");
    this._title = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._likeCount = this._element.querySelector(".card__like-count");

    this._title.textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;

    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_is-active");
    }

    this._setEventListeners();

    return this._element;
  }
}
