export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputs = Array.from(
      formElement.querySelectorAll(this._config.inputSelector)
    );
    this._button = formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  _showInputError(input) {
    const errorElement = this._formElement.querySelector(
      `#${input.id}-error`
    );
    errorElement.textContent = input.validationMessage;
  }

  _hideInputError(input) {
    const errorElement = this._formElement.querySelector(
      `#${input.id}-error`
    );
    errorElement.textContent = "";
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _toggleButtonState() {
    const hasInvalidInput = this._inputs.some(
      (input) => !input.validity.valid
    );
    this._button.disabled = hasInvalidInput;
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  // Público
  setEventListeners() {
    this._setEventListeners();
  }

  resetValidation() {
    this._inputs.forEach((input) => this._hideInputError(input));
    this._toggleButtonState();
  }
}
