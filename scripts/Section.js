export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items; // Array de datos
    this._renderer = renderer; // Callback para renderizar cada item
    this._container = document.querySelector(containerSelector);
  }

  // Renderiza todos los elementos iniciales
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  // Agrega un elemento del DOM al contenedor
  addItem(element) {
    this._container.prepend(element);
  }
}
