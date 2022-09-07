import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector, handleRemoveCard) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector('.button_type_confirm');
    this._handleRemoveCard = handleRemoveCard;
  }

  putCardId(id, handleDel) {
    this._cardId = id;
    this._handleDel = handleDel;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', () => {
      this._handleRemoveCard();
      this._handleDel();
    })
  }
  
  getCardId() {
    return this._cardId;
  }

}

