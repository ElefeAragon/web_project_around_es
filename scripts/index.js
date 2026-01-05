// =====================
// Selectores
// =====================
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
// Funciones popup
// =====================
function openModal(popup) {
  popup.classList.add("popup_is-opened");
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}

// =====================
// Perfil
// =====================
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

// =====================
// Tarjetas
// =====================
function getCardElement(
  name = "Sin título",
  link = "./images/placeholder.jpg"
) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  cardElement.querySelector(".card__title").textContent = name;
  const image = cardElement.querySelector(".card__image");
  image.src = link;
  image.alt = name;

  return cardElement;
}

function renderCard(name, link) {
  cardsContainer.prepend(getCardElement(name, link));
}

function handleCardFormSubmit(evt) {
  evt.preventDefault(); // Evita el envío por defecto

  // Crear la tarjeta con los valores del formulario
  const cardElement = getCardElement(cardNameInput.value, cardLinkInput.value);

  // Agregar la tarjeta como primer elemento
  cardsContainer.prepend(cardElement);

  // Cerrar la ventana emergente
  closeModal(newCardPopup);

  // Limpiar el formulario
  newCardForm.reset();
}

// =====================
// Event listeners
// =====================
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

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

newCardForm.addEventListener("submit", handleCardFormSubmit);

// =====================
// Render inicial
// =====================
initialCards.forEach((card) => renderCard(card.name, card.link));
