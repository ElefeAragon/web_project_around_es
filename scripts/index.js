// Selectores
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const editPopup = document.querySelector("#edit-popup");
const newCardPopup = document.querySelector("#new-card-popup");
const closeEditPopupButton = editPopup.querySelector(".popup__close");
const closeNewCardPopupButton = newCardPopup.querySelector(".popup__close");
const editProfileForm = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(
  ".popup__input_type_description"
);
const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const cardTemplate = document.querySelector("#card-template");
const cardsContainer = document.querySelector(".cards");

const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const closeImagePopupButton = imagePopup.querySelector(".popup__close");

// Datos iniciales
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// Funciones popup
function openModal(popup) {
  popup.classList.add("popup_is-opened");
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}

// Perfil
function fillProfileForm() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closeModal(editPopup);
}

// Tarjetas
function getCardElement(
  name = "Sin título",
  link = "./images/placeholder.jpg"
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  // Título
  cardElement.querySelector(".card__title").textContent = name;

  // Imagen
  const image = cardElement.querySelector(".card__image");
  image.src = link;
  image.alt = name;

  // Like
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", handleLikeButton);

  // Eliminar
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", handleDeleteCard);

  // Abrir popup de imagen
  image.addEventListener("click", () => {
    handleImageClick(name, link);
  });

  return cardElement;
}

function renderCard(name, link) {
  const cardElement = getCardElement(name, link);
  cardsContainer.prepend(cardElement);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  renderCard(cardNameInput.value, cardLinkInput.value);

  closeModal(newCardPopup);
  newCardForm.reset();
}

function handleLikeButton(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function handleDeleteCard(evt) {
  const cardElement = evt.target.closest(".card");
  cardElement.remove();
}

function handleImageClick(name, link) {
  popupImage.src = link; // 1. src
  popupImage.alt = name; // 2. alt
  popupCaption.textContent = name; // 3. caption
  openModal(imagePopup); // 4. abrir modal
}

// Event listeners
editProfileButton.addEventListener("click", () => {
  fillProfileForm();
  openModal(editPopup);
});

addCardButton.addEventListener("click", () => {
  openModal(newCardPopup);
});

closeEditPopupButton.addEventListener("click", () => closeModal(editPopup));
closeNewCardPopupButton.addEventListener("click", () =>
  closeModal(newCardPopup)
);

closeImagePopupButton.addEventListener("click", () => {
  closeModal(imagePopup);
});

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

newCardForm.addEventListener("submit", handleCardFormSubmit);

// Render inicial
initialCards.forEach((card) => {
  renderCard(card.name, card.link);
});
