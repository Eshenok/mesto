import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('.button_type_confirm').addEventListener('click', (evt) => {
      this._handleRemoveCardConfirm(evt)
    });
  }

  putCardId(id, handleDelButton) {
    this._cardId = id;
    this._handleDelButton = handleDelButton;
  }

  getCardId() {
    return this._cardId;
  }

  removeCard() {
    this._handleDelButton();
  }

}

