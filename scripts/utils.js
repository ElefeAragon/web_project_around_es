export function openModal(popup) {
  popup.classList.add("popup_is-opened");
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}

export function handleOverlayClick(evt) {
  if (evt.target.classList.contains("popup")) {
    closeModal(evt.target);
  }
}

export function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}
