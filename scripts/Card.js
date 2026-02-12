export default class Card {
<<<<<<< HEAD
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
=======
  constructor(data, templateSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }

  
  // Métodos privados
  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".card")
>>>>>>> fe928720d1254e4b665b6696fcb947ccc0c8aa67
      .cloneNode(true);
  }

  _handleLikeClick() {
<<<<<<< HEAD
    this._likeButton.classList.toggle("card__like-button_is-active");
=======
    this._likeButton.classList.toggle(
      "card__like-button_is-active"
    );
>>>>>>> fe928720d1254e4b665b6696fcb947ccc0c8aa67
  }

  _handleDeleteClick() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick();
    });

    this._image.addEventListener("click", () => {
<<<<<<< HEAD
      this._handleCardClick(this._name, this._link);
    });
  }

=======
      this._handleImageClick(this._name, this._link);
    });
  }


  // Método público
>>>>>>> fe928720d1254e4b665b6696fcb947ccc0c8aa67
  generateCard() {
    this._element = this._getTemplate();

    this._image = this._element.querySelector(".card__image");
    this._title = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._title.textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;

    this._setEventListeners();

    return this._element;
  }
}
