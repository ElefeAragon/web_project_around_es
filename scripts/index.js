import Card from "./Card.js";
import Section from "./Section.js";
import FormValidator from "./FormValidator.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";

// =====================
// Selectores
// =====================
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

// =====================
// Datos iniciales
// =====================
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

// =====================
// UserInfo
// =====================
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

// =====================
// Popup imagen
// =====================
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

// =====================
// Render tarjeta
// =====================
function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleCardClick);
  return card.generateCard();
}

// =====================
// Section
// =====================
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

// =====================
// Popups con formulario
// =====================
const editPopup = new PopupWithForm("#edit-popup", (formData) => {
  userInfo.setUserInfo({
    name: formData.name,
    job: formData.description,
  });
});

const newCardPopup = new PopupWithForm("#new-card-popup", (formData) => {
  const cardElement = renderCard({
    name: formData["place-name"],
    link: formData.link,
  });
  cardSection.addItem(cardElement);
});

editPopup.setEventListeners();
newCardPopup.setEventListeners();

// =====================
// Validación
// =====================
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

editProfileValidator.setEventListeners();
newCardValidator.setEventListeners();

// =====================
// Eventos botones
// =====================
editProfileButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  const form = document.querySelector("#edit-profile-form");

  form.elements.name.value = userData.name;
  form.elements.description.value = userData.job;

  editProfileValidator.resetValidation();
  editPopup.open();
});

addCardButton.addEventListener("click", () => {
  newCardValidator.resetValidation();
  newCardPopup.open();
});

// =====================
// Render inicial
// =====================
cardSection.renderItems();
