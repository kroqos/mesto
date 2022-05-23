export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._itemsArray = items;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  renderItems() {
    this._itemsArray.forEach((item) => this._renderer(item));
  }

  addItem(itemHtml) {
    this._container.append(itemHtml);
  }
}
