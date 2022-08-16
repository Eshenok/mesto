export default class Section {
  constructor({item, renderer}, containerSelector) {
    this._item = item;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderer(this._item);
  }
  
  setItem(element) {
    this._container.append(element);
  }

}