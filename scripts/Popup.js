export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);

    // Bind para que "this" funcione correctamente
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Método público: abre el popup
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  // Método público: cierra el popup
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  // Método privado: cierra con tecla ESC
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  // Método público: agrega listeners
  setEventListeners() {
    // Botón cerrar
    const closeButton = this._popup.querySelector(".popup__close");
    closeButton.addEventListener("click", () => {
      this.close();
    });

    // Click en overlay
    this._popup.addEventListener("click", (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
  }
}
