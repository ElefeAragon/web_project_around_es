import Card from "./Card.js";
import Section from "./Section.js";
import FormValidator from "./FormValidator.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";

// Selectores
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const imagePopup = new PopupWithImage("#image-popup");

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

editProfileValidator.setEventListeners();
newCardValidator.setEventListeners();

// Perfil
function fillProfileForm() {
  const userData = userInfo.getUserInfo();

  const form = document.querySelector("#edit-profile-form");
  form.elements.name.value = userData.name;
  form.elements.description.value = userData.job;

  editProfileValidator.resetValidation();
}

// Tarjetas
function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleCardClick);
  return card.generateCard();
}

// Eventos
editProfileButton.addEventListener("click", () => {
  fillProfileForm();
  editPopupInstance.open();
});

addCardButton.addEventListener("click", () => {
  newCardValidator.resetValidation();
  newCardPopupInstance.open();
});

// Inicialización
imagePopup.setEventListeners();
editPopupInstance.setEventListeners();
newCardPopupInstance.setEventListeners();
cardSection.renderItems();
