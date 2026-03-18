import Card from "./Card.js";
import Section from "./Section.js";
import FormValidator from "./FormValidator.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
import Api from "./Api.js";

// API
const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "ff14be09-b767-431a-8cef-a60c95a5dc85",
    "Content-Type": "application/json",
  },
});

// Selectores
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const avatarButton = document.querySelector(".profile__avatar-container");
const deletePopup = new PopupWithConfirmation("#delete-card-popup");
deletePopup.setEventListeners();

// UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

// Popup imagen
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

// Crear tarjeta
function renderCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleCardClick,

    // DELETE
    (cardInstance) => {
      deletePopup.setSubmitAction(() => {
        api
          .deleteCard(cardInstance.getId())
          .then(() => {
            cardInstance.handleDeleteClick();
            deletePopup.close();
          })
          .catch(console.log);
      });

      deletePopup.open();
    },

    // LIKE
    (cardInstance) => {
      const cardId = cardInstance.getId();
      if (!cardInstance.isLiked()) {
        api
          .likeCard(cardId)
          .then((data) => {
            cardInstance.setLikes(data.likes);
          })
          .catch(console.log);
      } else {
        api
          .unlikeCard(cardId)
          .then((data) => {
            cardInstance.setLikes(data.likes);
          })
          .catch(console.log);
      }
    },
  );

  return card.generateCard();
}

// Section
const cardSection = new Section(
  {
    items: [],
    renderer: (item) => {
      const cardElement = renderCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".elements",
);

// Popup editar perfil
const editPopup = new PopupWithForm("#edit-popup", (formData) => {
  const button = document.querySelector("#edit-profile-form .popup__button");
  const originalText = button.textContent;
  button.textContent = "Guardando...";
  api
    .setUserInfo(formData.name, formData.description)
    .then((user) => {
      userInfo.setUserInfo({
        name: user.name,
        job: user.about,
      });

      editPopup.close();
    })
    .catch(console.log)
    .finally(() => {
      button.textContent = originalText;
    });
});

// Popup nueva tarjeta
const newCardPopup = new PopupWithForm("#new-card-popup", (formData) => {
  const button = document.querySelector("#new-card-form .popup__button");
  const originalText = button.textContent;
  button.textContent = "Guardando...";

  api
    .addCard(formData["place-name"], formData.link)
    .then((cardData) => {
      const cardElement = renderCard(cardData);
      cardSection.addItem(cardElement);
      newCardPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      button.textContent = originalText;
    });
});
const avatarPopup = new PopupWithForm("#avatar-popup", (formData) => {
  const button = document.querySelector("#avatar-form .popup__button");
  const originalText = button.textContent;
  button.textContent = "Guardando...";

  api
    .setUserAvatar(formData.avatar)
    .then((user) => {
      document.querySelector(".profile__image").src = user.avatar;
      avatarPopup.close();
    })
    .catch(console.log)
    .finally(() => {
      button.textContent = originalText;
    });
});

avatarPopup.setEventListeners();
editPopup.setEventListeners();
newCardPopup.setEventListeners();

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

const avatarValidator = new FormValidator(
  validationConfig,
  document.querySelector("#avatar-form"),
);

avatarValidator.setEventListeners();

editProfileValidator.setEventListeners();
newCardValidator.setEventListeners();

// Botón editar perfil
editProfileButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  const form = document.querySelector("#edit-profile-form");

  form.elements.name.value = userData.name;
  form.elements.description.value = userData.job;

  editProfileValidator.resetValidation();
  editPopup.open();
});

// Botón agregar tarjeta
addCardButton.addEventListener("click", () => {
  newCardValidator.resetValidation();
  newCardPopup.open();
});

avatarButton.addEventListener("click", () => {
  avatarValidator.resetValidation();
  avatarPopup.open();
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo({
      name: user.name,
      job: user.about,
    });

    document.querySelector(".profile__image").src = user.avatar;

    cards.forEach((card) => {
      const cardElement = renderCard(card);
      cardSection.addItem(cardElement);
    });
  })
  .catch(console.log);
