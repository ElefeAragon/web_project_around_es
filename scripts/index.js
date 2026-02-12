import Card from "./Card.js";
<<<<<<< HEAD
import Section from "./Section.js";
import FormValidator from "./FormValidator.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";
=======
import FormValidator from "./FormValidator.js";
import {
  openModal,
  closeModal,
  handleOverlayClick,
  handleEscClose,
} from "./utils.js";
>>>>>>> fe928720d1254e4b665b6696fcb947ccc0c8aa67

// Selectores
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
<<<<<<< HEAD

const imagePopup = new PopupWithImage("#image-popup");
=======

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
>>>>>>> fe928720d1254e4b665b6696fcb947ccc0c8aa67

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

<<<<<<< HEAD
// Sección de tarjetas
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = renderCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".elements",
);

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const editPopupInstance = new PopupWithForm("#edit-popup", (formData) => {
  userInfo.setUserInfo({
    name: formData.name,
    job: formData.description,
  });
});

const newCardPopupInstance = new PopupWithForm(
  "#new-card-popup",
  (formData) => {
    const cardElement = renderCard({
      name: formData["place-name"],
      link: formData.link,
    });

    cardSection.addItem(cardElement);
  },
);

// Validación
const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
};

const editProfileValidator = new FormValidator(
  validationConfig,
  document.querySelector("#edit-profile-form"),
);

const newCardValidator = new FormValidator(
  validationConfig,
  document.querySelector("#new-card-form"),
);
=======
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
>>>>>>> fe928720d1254e4b665b6696fcb947ccc0c8aa67

editProfileValidator.setEventListeners();
newCardValidator.setEventListeners();

// Perfil
function fillProfileForm() {
<<<<<<< HEAD
  const userData = userInfo.getUserInfo();

  const form = document.querySelector("#edit-profile-form");
  form.elements.name.value = userData.name;
  form.elements.description.value = userData.job;

=======
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
>>>>>>> fe928720d1254e4b665b6696fcb947ccc0c8aa67
  editProfileValidator.resetValidation();
}

// Tarjetas
<<<<<<< HEAD
function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleCardClick);
  return card.generateCard();
=======
function handleImageClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(imagePopup);
}

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  cardsContainer.prepend(card.generateCard());
>>>>>>> fe928720d1254e4b665b6696fcb947ccc0c8aa67
}

// Eventos
editProfileButton.addEventListener("click", () => {
  fillProfileForm();
  editPopupInstance.open();
});

addCardButton.addEventListener("click", () => {
  newCardValidator.resetValidation();
<<<<<<< HEAD
  newCardPopupInstance.open();
});

// Inicialización
imagePopup.setEventListeners();
editPopupInstance.setEventListeners();
newCardPopupInstance.setEventListeners();
cardSection.renderItems();
=======
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
>>>>>>> fe928720d1254e4b665b6696fcb947ccc0c8aa67
