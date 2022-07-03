export default class Section {
  constructor({ renderer, containerSelector }) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  renderItems(itemsArray) {
    itemsArray.forEach((item) => this._renderer(item));
  }

  addItem(itemHtml) {
    this._container.prepend(itemHtml);
  }
}
