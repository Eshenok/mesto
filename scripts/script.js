'use strict'

import { popupCardConfig, popupProfileConfig, commonPopupConfig } from "./config.js";
import { Popup, PopupCard, PopupProfile } from "./Popup.js";

const closePopup = new Popup(commonPopupConfig, '.popup').enableHandleClosePopups();
const profilePopup = new PopupProfile(commonPopupConfig, '.popup_type_profile', popupProfileConfig).enablePopup();
const cardPopup = new PopupCard(commonPopupConfig, '.popup_type_card', popupCardConfig).enablePopup();