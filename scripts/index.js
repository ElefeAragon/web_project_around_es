// Selectores
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const editPopup = document.querySelector("#edit-popup");
const newCardPopup = document.querySelector("#new-card-popup");
const closeEditPopupButton = editPopup.querySelector(".popup__close");
const closeNewCardPopupButton = newCardPopup.querySelector(".popup__close");

enableValidation(editProfileForm);

const newCardForm = document.querySelector("#new-card-form");
enableValidation(editProfileForm);
enableValidation(newCardForm);

const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(
  ".popup__input_type_description",
);
const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const cardTemplate = document.querySelector("#card-template");
const cardsContainer = document.querySelector(".elements");

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

//Cerrar con clic en la superposicion
function handleOverlayClick(evt) {
  if (evt.target.classList.contains("popup")) {
    closeModal(evt.target);
  }
}

//Cerrar con ESC 
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

// Perfil
function fillProfileForm() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  resetValidation(editProfileForm);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closeModal(editPopup);
}

// Tarjetas
function getCardElement(name, link) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  cardElement.querySelector(".card__title").textContent = name;

  const image = cardElement.querySelector(".card__image");
  image.src = link;
  image.alt = name;

  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", handleLikeButton);

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", handleDeleteCard);

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

// Validación
function showInputError(form, input) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  errorElement.textContent = input.validationMessage;
}

function hideInputError(form, input) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  errorElement.textContent = "";
}

function checkInputValidity(form, input) {
  if (!input.validity.valid) {
    showInputError(form, input);
  } else {
    hideInputError(form, input);
  }
}

function toggleButtonState(inputs, button) {
  const hasInvalidInput = inputs.some((input) => !input.validity.valid);

  button.disabled = hasInvalidInput;
}

function enableValidation(form) {
  const inputs = Array.from(form.querySelectorAll(".popup__input"));
  const button = form.querySelector(".popup__button");

  toggleButtonState(inputs, button);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input);
      toggleButtonState(inputs, button);
    });
  });
}

function resetValidation(form) {
  const inputs = Array.from(form.querySelectorAll(".popup__input"));
  const button = form.querySelector(".popup__button");

  inputs.forEach((input) => hideInputError(form, input));
  toggleButtonState(inputs, button);
}

const popups = Array.from(document.querySelectorAll(".popup"));

popups.forEach((popup) => {
  popup.addEventListener("click", handleOverlayClick);
});


// Event listeners
editProfileButton.addEventListener("click", () => {
  fillProfileForm();
  openModal(editPopup);
});

addCardButton.addEventListener("click", () => {
  resetValidation(newCardForm);
  openModal(newCardPopup);
});

closeEditPopupButton.addEventListener("click", () => closeModal(editPopup));
closeNewCardPopupButton.addEventListener("click", () =>
  closeModal(newCardPopup),
);

closeImagePopupButton.addEventListener("click", () => {
  closeModal(imagePopup);
});

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

newCardForm.addEventListener("submit", handleCardFormSubmit);

document.addEventListener("keydown", handleEscClose);

// Render inicial
initialCards.forEach((card) => {
  renderCard(card.name, card.link);
});
