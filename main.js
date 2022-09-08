(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._config=e,this._formElement=n}var n,r;return n=t,(r=[{key:"_checkValidate",value:function(e){e.validity.valid?this._hideErrorMessage(e):this._showErrorMessage(e,e.validationMessage),this._switchButtonState()}},{key:"_showErrorMessage",value:function(e,t){this._errorElement=this._formElement.querySelector(".".concat(e.id,"-error")),this._errorElement.textContent=t,e.classList.add(this._config.inputErrorClass),this._errorElement.classList.add(this._config.errorClass)}},{key:"_hideErrorMessage",value:function(e){this._errorElement=this._formElement.querySelector(".".concat(e.id,"-error")),this._errorElement.textContent=" ",e.classList.remove(this._config.inputErrorClass),this._errorElement.classList.remove(this._config.errorClass)}},{key:"_setEventListeners",value:function(){var e=this;this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._checkValidate(t)}))}))}},{key:"_checkValidateForm",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_handleHideErrorMessage",value:function(){var e=this;this._inputList.forEach((function(t){e._hideErrorMessage(t)}))}},{key:"_switchButtonState",value:function(){this._checkValidateForm()?(this._buttonElement.setAttribute("disabled",""),this._buttonElement.classList.add(this._config.inactiveButtonClass)):(this._buttonElement.removeAttribute("disabled"),this._buttonElement.classList.remove(this._config.inactiveButtonClass))}},{key:"switchStateForm",value:function(){this._handleHideErrorMessage(),this._switchButtonState()}},{key:"enableValidate",value:function(){this._buttonElement=this._formElement.querySelector(this._config.submitButtonSelector),this._inputList=Array.from(this._formElement.querySelectorAll(this._config.inputSelector)),this._setEventListeners(),this._switchButtonState()}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t,n,r,o,i,a,c){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._data=t,this._userId=n,this._templateId=r,this._config=o,this._handleImageClick=i,this._handleDelClick=a,this._handleLike=c}var t,r;return t=e,(r=[{key:"_getTemplate",value:function(){return document.querySelector(this._templateId).content.cloneNode(!0)}},{key:"_handleDelButton",value:function(){var e=this._config.cardItemSelector;this._delButton.closest(e).remove()}},{key:"_setEventListeners",value:function(){var e=this;this._likeButton.addEventListener("click",(function(){e._handleLike(e._cardId)})),this._delButton.addEventListener("click",(function(){e._handleDelClick(e._cardId,e._handleDelButton.bind(e))})),this._cardImage.addEventListener("click",(function(){e._handleImageClick(e._data)}))}},{key:"_updateLikesView",value:function(){this._likeCounter.textContent=this._likes.length,this._likeButton.classList.toggle(this._config.buttonLikeActiveClass,this.isLiked())}},{key:"isLiked",value:function(){var e=this;return this._likes.some((function(t){return t._id===e._userId}))}},{key:"updateLikes",value:function(e){this._likes=e,this._updateLikesView()}},{key:"generateCard",value:function(){return this._cardElement=this._getTemplate(),this._cardImage=this._cardElement.querySelector(this._config.cardImageSelector),this._cardElement.querySelector(this._config.cardCaptionSelector).textContent=this._data.name,this._cardImage.src=this._data.link,this._cardImage.alt=this._data.name,this._likeButton=this._cardElement.querySelector(this._config.buttonLikeSelector),this._likeCounter=this._cardElement.querySelector(".photo-grid__counter"),this._likeCounter.textContent=this._data.likes.length,this._delButton=this._cardElement.querySelector(this._config.buttonDelSelector),this._cardId=this._data._id,this._data.owner._id!=this._userId&&this._delButton.classList.add("button_type_none"),this.updateLikes(this._data.likes),this._setEventListeners(),this._cardElement}}])&&n(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(t,n){var r=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=r,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"renderItems",value:function(e){var t=this;e.forEach((function(e){return t._renderer(e)}))}},{key:"prependItem",value:function(e){this._container.prepend(e)}},{key:"appendItem",value:function(e){this._container.append(e)}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var c=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._handlerKeypressEsc=this._checkKeypressEsc.bind(this)}var t,n;return t=e,(n=[{key:"_checkKeypressEsc",value:function(e){"Escape"===e.key&&this.close()}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handlerKeypressEsc)}},{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handlerKeypressEsc)}},{key:"setEventListeners",value:function(){var e=this;this._popup.querySelector(".button_icon_close").addEventListener("click",(function(){e.close()})),this._popup.querySelector(".popup__overlay").addEventListener("click",(function(){e.close()}))}}])&&a(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function u(e){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u(e)}function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(){return l="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=p(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},l.apply(this,arguments)}function p(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=_(e)););return e}function f(e,t){return f=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},f(e,t)}function h(e,t){if(t&&("object"===u(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function _(e){return _=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},_(e)}var d=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&f(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=_(r);if(o){var n=_(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return h(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._handleSubmitForm=t,n._form=n._popup.querySelector(".popup__form"),n._inputList=n._form.querySelectorAll(".popup__input"),n._buttonSubmit=n._form.querySelector(".button_theme_dark"),n._buttonSubmitText=n._buttonSubmit.textContent,n}return t=a,(n=[{key:"_getInputValues",value:function(){var e=this;return this._inputValues={},this._inputList.forEach((function(t){e._inputValues[t.name]=t.value})),this._inputValues}},{key:"renderLoading",value:function(e,t){this._buttonSubmit.textContent=e?t:this._buttonSubmitText}},{key:"setEventListeners",value:function(){var e=this;l(_(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(t){t.preventDefault(),e._handleSubmitForm(e._getInputValues())}))}},{key:"close",value:function(){l(_(a.prototype),"close",this).call(this),this._form.reset()}}])&&s(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(c);function y(e){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},y(e)}function b(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(){return m="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=v(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},m.apply(this,arguments)}function v(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=w(e)););return e}function g(e,t){return g=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},g(e,t)}function k(e,t){if(t&&("object"===y(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function w(e){return w=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},w(e)}var E=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&g(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=w(r);if(o){var n=w(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return k(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._popupImage=t._popup.querySelector(".popup__image"),t._popupCaption=t._popup.querySelector(".popup__caption"),t}return t=a,(n=[{key:"open",value:function(e){m(w(a.prototype),"open",this).call(this),this._popupImage.setAttribute("src",e.link),this._popupImage.setAttribute("alt",e.name),this._popupCaption.textContent=e.name}}])&&b(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(c),S={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".button",inactiveButtonClass:"button_type_disabled",inputErrorClass:"popup__input-error",errorClass:"popup__input-span-error_active"},O={buttonLikeSelector:".button_icon_like",buttonDelSelector:".button_icon_delete",buttonClosePopupSelector:".button_close_image",imagePopupContainerSelector:".popup_type_image",imagePopupSelector:".popup__image",captionPopupSelector:".popup__caption",cardItemSelector:".photo-grid__item",cardImageSelector:".photo-grid__image",cardCaptionSelector:".photo-grid__caption",buttonLikeActiveClass:"button_icon_like-active",popupOpenedClass:"popup_opened"},L=document.querySelector(".button_icon_edit"),C=document.querySelector(".button_icon_add"),j=document.querySelector(".popup__input_type_name"),P=document.querySelector(".popup__input_type_occupation"),I=(document.querySelector(".button_type_confirm"),document.querySelector(".profile__avatar"));function R(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var q=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._userName=document.querySelector(t),this._userOccupation=document.querySelector(n),this._profileAvatar=document.querySelector(".profile__avatar")}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._userName.textContent,occupation:this._userOccupation.textContent}}},{key:"getUserId",value:function(){return this._userId}},{key:"setUserId",value:function(e){this._userId=e}},{key:"setUserAvatar",value:function(e){this._profileAvatar.style.backgroundImage="url(".concat(e,")")}},{key:"setUserInfo",value:function(e,t){this._userName.textContent=e,this._userOccupation.textContent=t}}])&&R(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function D(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var T=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._baseUrl=t.baseUrl,this._headers=t.headers}var t,n;return t=e,(n=[{key:"_getResponseData",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}},{key:"getInitialCards",value:function(){var e=this;return fetch("".concat(this._baseUrl,"/cards"),{headers:this._headers}).then((function(t){return e._getResponseData(t)}))}},{key:"getUserInfo",value:function(){var e=this;return fetch("".concat(this._baseUrl,"/users/me"),{headers:this._headers}).then((function(t){return e._getResponseData(t)}))}},{key:"putProfileData",value:function(e,t){var n=this;return fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e,about:t})}).then((function(e){return n._getResponseData(e)}))}},{key:"putNewCard",value:function(e,t){var n=this;return fetch("".concat(this._baseUrl,"/cards "),{method:"POST",headers:this._headers,body:JSON.stringify({name:e,link:t})}).then((function(e){return n._getResponseData(e)}))}},{key:"putNewAvatar",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then((function(e){return t._getResponseData(e)}))}},{key:"removeCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e),{method:"DELETE",headers:this._headers}).then((function(e){return!!e.ok||Promise.reject("Ошибка: ".concat(e.status))}))}},{key:"putLike",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:"PUT",headers:this._headers}).then((function(e){return t._getResponseData(e)}))}},{key:"removeLike",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:"DELETE",headers:this._headers}).then((function(e){return t._getResponseData(e)}))}}])&&D(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function U(e){return U="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},U(e)}function B(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function A(){return A="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=x(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},A.apply(this,arguments)}function x(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=M(e)););return e}function V(e,t){return V=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},V(e,t)}function N(e,t){if(t&&("object"===U(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function M(e){return M=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},M(e)}var F=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&V(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=M(r);if(o){var n=M(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return N(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._confirmButton=n._popup.querySelector(".button_type_confirm"),n._handleRemoveCard=t,n}return t=a,(n=[{key:"putCardConfig",value:function(e,t){this._cardId=e,this._handleDelCard=t}},{key:"setEventListeners",value:function(){var e=this;A(M(a.prototype),"setEventListeners",this).call(this),this._confirmButton.addEventListener("click",(function(){e._handleRemoveCard(e._cardId,e._handleDelCard)}))}}])&&B(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(c);function K(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function H(e){var t=e.name,n=e.link,o=e.likes,i=e._id,a=e.owner;return new r({name:t,link:n,likes:o,_id:i,owner:a},W.getUserId(),"#photo-grid__template",O,J,z,$).generateCard()}function J(e){te.open(e)}function z(e,t){ne.open(),ne.putCardConfig(e,t)}function $(e){var t=this;this.isLiked()?oe.removeLike(e).then((function(e){t.updateLikes(e.likes)})).catch((function(e){console.log(e)})):oe.putLike(e).then((function(e){t.updateLikes(e.likes)})).catch((function(e){console.log(e)}))}var G=new d(".popup_type_profile-image",(function(e){G.renderLoading(!0,"Сохряняем...");var t=e["popup__input_type_profile-image"];oe.putNewAvatar(t).then((function(e){W.setUserAvatar(e.avatar),G.close()})).catch((function(e){console.log(e)})).finally((function(){G.renderLoading(!1)}))})),Q=new t(S,document.querySelector(".popup__form_type_profile-image")),W=new q(".profile__name",".profile__occupation"),X=new d(".popup_type_profile",(function(e){X.renderLoading(!0,"Сохряняем..."),oe.putProfileData(e.popup__input_type_name,e.popup__input_type_occupation).then((function(e){W.setUserInfo(e.name,e.about),X.close()})).catch((function(e){console.log(e)})).finally((function(){X.renderLoading(!1)}))})),Y=new t(S,document.querySelector(".popup__form_type_edit-profile")),Z=new d(".popup_type_card",(function(e){Z.renderLoading(!0,"Создаем...");var t=e["popup__input_type_image-caption"],n=e["popup__input_type_image-src"];oe.putNewCard(t,n).then((function(e){re.prependItem(H(e)),Z.close()})).catch((function(e){console.log(e)})).finally((function(){Z.renderLoading(!1)}))})),ee=new t(S,document.querySelector(".popup__form_type_add-content")),te=new E(".popup_type_image"),ne=new F(".popup_type_confirm",(function(e,t){oe.removeCard(e).then((function(e){e&&(t(),ne.close())})).catch((function(e){console.log(e)}))})),re=new i({renderer:function(e){re.appendItem(H(e))}},".photo-grid"),oe=new T({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-49",headers:{authorization:"77ff3fbe-135e-4442-b69c-13d620392262","Content-Type":"application/json"}});Promise.all([oe.getUserInfo(),oe.getInitialCards()]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,c=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){c=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(c)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return K(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?K(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];W.setUserId(o._id),W.setUserInfo(o.name,o.about),W.setUserAvatar(o.avatar),re.renderItems(i)})).catch((function(e){console.log(e)})),X.setEventListeners(),Z.setEventListeners(),te.setEventListeners(),ne.setEventListeners(),G.setEventListeners(),Y.enableValidate(),ee.enableValidate(),Q.enableValidate(),L.addEventListener("click",(function(){var e=W.getUserInfo();j.value=e.name,P.value=e.occupation,Y.switchStateForm(),X.open()})),C.addEventListener("click",(function(){ee.switchStateForm(),Z.open()})),I.addEventListener("click",(function(){Q.switchStateForm(),G.open()}))})();