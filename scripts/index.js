const editProfileButton = document.querySelector(".profile__edit-button"); // Botón "Editar perfil"
const editPopup = document.querySelector("#edit-popup"); // Popup de editar perfil
const closeEditPopupButton = editPopup.querySelector(".popup__close"); // Botón de cerrar (X) dentro del popup

//Creacion de array con variables.
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

/*Cree una function con forEach para recorrer el array, mostrando en consola el name. */
initialCards.forEach(function (card) {
  console.log(card.name);
});

function openModal(popup) {
  popup.classList.add("popup_is-opened");
}
function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}
// Abrir popup al hacer clic en "Editar perfil"
editProfileButton.addEventListener("click", () => {
  openModal(editPopup);
});
// Cerrar popup al hacer clic en la X
closeEditPopupButton.addEventListener("click", () => {
  closeModal(editPopup);
});

// Elementos del perfil en la página
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
// Inputs del formulario
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(
  ".popup__input_type_description"
);
function fillProfileForm() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}
editProfileButton.addEventListener("click", () => {
  fillProfileForm();
  openModal(editPopup);
});

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editPopup);
}

editProfileButton.addEventListener("click", handleOpenEditModal);

// Vamos a buscar el formulario en el DOM
let formElement = document.querySelector("#edit-profile-form");

// Controlador para el envío del formulario
function handleProfileFormSubmit(evt) {
  // Evita el envío por defecto del formulario
  evt.preventDefault();

  // Vamos a buscar los campos del formulario en el DOM
  let nameInput = document.querySelector(".popup__input_type_name");
  let jobInput = document.querySelector(".popup__input_type_description");

  // Selecciona los elementos donde se introducirán los valores
  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  // Inserta los nuevos valores en la página
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  // (Opcional, pero recomendado) cerrar el popup al guardar
  closeModal(editPopup);
}
