
import './pages/index.css';
import { addNewCardApi, editUserDataApi, getInitialsCardsApi, getUserDataApi, updateAvatarApi } from './components/api.js';
import { initialCards } from './components/cards.js';
import { openModal, closeModal, closeModalOnEscape } from './components/modal.js'; 
import { createCard, deleteCard, setLikeToCard } from './components/card.js'; 
import { clearValidation, enableValidation } from './components/validation.js';

// находим все попапы
const popupAll = document.querySelectorAll(".popup");

//находим кнопку редактирования профиля, поля профиля, форму
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button");

// находим форму редактирования профиля, попап ред-ия профиля, поля попапа редактирования профиля
const popupProfileEdit = document.querySelector(".popup_type_edit");
const popupProfileForm = document.forms["edit-profile"];
const nameInput = document.querySelector('.popup__input_type_description');
const jobInput = document.querySelector('.popup__input_type_name');

// находим кнопку добавления карточки
const newCardButton = document.querySelector('.profile__add-button');

// находим попап добавления карточки, форму добавления карточки, поля формы
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardForm = document.forms["new-place"];
const cardNameInput = popupNewCard.querySelector('.popup__input_type_card-name');
const cardImgUrlInput = popupNewCard.querySelector('.popup__input_type_url');

//переменные попапа картинки
const popupPicture = document.querySelector('.popup_type_image');
const popupPictureImage = document.querySelector('.popup__image');
const popupPictureText = document.querySelector('.popup__caption');

// переменные лайка
const likeButton = document.querySelector('.card__like-button');

// находим аватар и его элементы

const editAvatarPopup = document.querySelector('.popup_type_avatar');
const editAvatarForm = document.querySelector('.popup__form[name="edit-avatar"]');
const avatarUrlInput = editAvatarForm.querySelector('.popup__input_type_avatar');
const profileAvatar = document.querySelector('.profile__image');
const profileAddButton = document.querySelector('.profile__add-button');

// получаем темплейт карточки

const placesList = document.querySelector('.places__list');

let currentUserId = null;

// создаём конфиг проверки валидации

const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible',
}

// functions

// функция заполнения попапа редактирования профиля
const fillProfilePopup = (form, name, description) => {
  form.elements.name.value = name;
  form.elements.description.value = description;
};

//функция инициализации попапа с картинкой

function openImagePopup(imageSrc, caption) {
	popupPictureImage.src = imageSrc
	popupPictureImage.alt = caption
	popupPictureText.textContent = caption

	openModal(popupPicture)
}

// функция заполения профиля новыми данными после submit

function handleProfilFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupProfileForm);
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  editUserDataApi(nameValue, jobValue)
		.then(userData => {
      profileTitle.textContent = jobValue;
      profileDescription.textContent = nameValue;
      closeModal(popupProfileEdit);
    })
    .catch(err => console.log(err))
		.finally(() => {
			renderLoading(false, popupProfileForm)
		});
}

// функция добавления карточки

function submitAddCard(evt) {
  evt.preventDefault();
  renderLoading(true, popupNewCardForm);
  const cardDataObj = {};
  cardDataObj.name = cardNameInput.value;
  cardDataObj.link = cardImgUrlInput.value;

  addNewCardApi(cardDataObj.name, cardDataObj.link)
    .then(card =>  {
      const newCard = createCard(card._id, 
        cardDataObj.name, 
        cardDataObj.link,
        deleteCard, 
        card.likes, 
        setLikeToCard, 
        openImagePopup, 
        card.owner._id, 
        currentUserId)
        addCard(newCard, true)
        popupNewCardForm.reset()
        closeModal(popupNewCard)
    })
    .catch(err => console.error(err))
		.finally(() => {
			renderLoading(false, popupNewCardForm)
		})
}

function addCard(cardElement, toStart) {
	if (toStart) {
		placesList.prepend(cardElement)
	} else {
		placesList.append(cardElement)
	}
}

Promise.all([getUserDataApi(), getInitialsCardsApi()])
	.then(([userData, initialCards]) => {
		currentUserId = userData._id
		profileTitle.textContent = userData.name
		profileDescription.textContent = userData.about
		profileAvatar.style.backgroundImage = `url(${userData.avatar})`

		initialCards.forEach(card => {
			const newCard = createCard(card._id, card.name, card.link, deleteCard, card.likes, setLikeToCard, openImagePopup, card.owner._id, currentUserId)
			addCard(newCard)
		})
	})
	.catch(error => console.log(error))

// функция обновления аватара 

function handleEditAvatarSubmit(evt) {
	evt.preventDefault()
	renderLoading(true, editAvatarForm)
	const avatarUrl = avatarUrlInput.value
	updateAvatarApi(avatarUrl)
		.then(avatar => {
			profileAvatar.style.backgroundImage = `url(${avatar.avatar})`
			editAvatarForm.reset()
			closeModal(editAvatarPopup)
		})
		.catch(err => console.log(err))
		.finally(() => {
			renderLoading(false, editAvatarForm)
		})
};

// функция лоадинга

const renderLoading = (isLoading, formElement) => {
	const buttonElement = formElement.querySelector('.popup__button')
	if (isLoading) {
		buttonElement.setAttribute('data-text', buttonElement.textContent)
		buttonElement.textContent = 'Сохранение...'
	} else {
		buttonElement.textContent = buttonElement.getAttribute('data-text')
		buttonElement.removeAttribute('data-text')
	}
}

// листенеры
//profile popup
profileEditButton.addEventListener("click", () => {
  fillProfilePopup(
    popupProfileForm,
    profileTitle.textContent,
    profileDescription.textContent,
  );
  clearValidation(popupProfileForm, validationConfig);
  openModal(popupProfileEdit);
});

profileAddButton.addEventListener('click', () => {
	popupNewCardForm.reset()
	clearValidation(popupNewCardForm, validationConfig)
	openModal(popupNewCard)
});

profileAvatar.addEventListener('click', () => {
	editAvatarForm.reset()
	clearValidation(editAvatarForm, validationConfig)
	openModal(editAvatarPopup)
});

// add card popup
newCardButton.addEventListener("click", () => {
  popupNewCardForm.reset();
  clearValidation(popupNewCardForm, validationConfig);
  openModal(popupNewCard);
});

// обработчик submit на редактирование профиля
popupProfileForm.addEventListener('submit', handleProfilFormSubmit); 

// обрабочик submit добавления карточки
popupNewCardForm.addEventListener('submit', submitAddCard);

// обработчик submit обновления аватара
editAvatarForm.addEventListener('submit', handleEditAvatarSubmit);

// добавляем анимацию всем попапам
popupAll.forEach((element) => element.classList.add('popup_is-animated'));

// цикл закрытия всех попапов крестику или оверлею
popupAll.forEach(function(element) {
  element.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains("popup__close")) {
      closeModal(evt.currentTarget);
    }
  })
});

enableValidation(validationConfig);









