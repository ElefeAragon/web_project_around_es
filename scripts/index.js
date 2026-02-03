import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  openModal,
  closeModal,
  handleOverlayClick,
  handleEscClose,
} from "./utils.js";

// Selectores
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const editPopup = document.querySelector("#edit-popup");
const newCardPopup = document.querySelector("#new-card-popup");
const imagePopup = document.querySelector("#image-popup");

const editProfileForm = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");

const nameInput = editProfileForm.querySelector(".popup__input_type_name");
const descriptionInput = editProfileForm.querySelector(
  ".popup__input_type_description",
);

const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const cardsContainer = document.querySelector(".elements");

const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

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

// Validación
const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
};

const editProfileValidator = new FormValidator(
  validationConfig,
  editProfileForm,
);

const newCardValidator = new FormValidator(validationConfig, newCardForm);

editProfileValidator.setEventListeners();
newCardValidator.setEventListeners();

// Perfil
function fillProfileForm() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  editProfileValidator.resetValidation();
}

// Tarjetas
function handleImageClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(imagePopup);
}

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  cardsContainer.prepend(card.generateCard());
}

// Eventos
editProfileButton.addEventListener("click", () => {
  fillProfileForm();
  openModal(editPopup);
});

addCardButton.addEventListener("click", () => {
  newCardValidator.resetValidation();
  openModal(newCardPopup);
});

editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editPopup);
});

newCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderCard({
    name: cardNameInput.value,
    link: cardLinkInput.value,
  });
  newCardForm.reset();
  closeModal(newCardPopup);
});

// Overlay + ESC
document.addEventListener("keydown", handleEscClose);
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", handleOverlayClick);
});

// Render inicial
initialCards.forEach((card) => renderCard(card));
