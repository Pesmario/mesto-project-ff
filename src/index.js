
import './pages/index.css';
import { initialCards } from './components/cards.js';
import { openModal, closeModal, closeModalOnEscape } from './components/modal.js'; 
import { createCard, deleteCard, isLiked } from './components/card.js'; 

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

// получаем темплейт карточки

const placesList = document.querySelector('.places__list');

initialCards.forEach(function(cardElement) {
  const newCard = createCard(cardElement, deleteCard, initialImagePopup, isLiked);
  placesList.append(newCard);
});

// functions

// функция заполнения попапа редактирования профиля
const fillProfilePopup = (form, name, description) => {
  form.elements.name.value = name;
  form.elements.description.value = description;
};

//функция инициализации попапа с картинкой
function initialImagePopup(evt) {
  popupPictureImage.src = evt.currentTarget.src;
  popupPictureImage.alt = evt.currentTarget.alt;
  popupPictureText.textContent = popupPictureImage.alt;
  openModal(popupPicture);
};

// функция заполения профиля новыми данными после submit

function handleFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileTitle.textContent = jobValue;
  profileDescription.textContent = nameValue;
  closeModal(popupProfileEdit);
}

// функция добавления карточки

function submitAddCard(evt) {
  evt.preventDefault();
  const cardDataObj = {};
  cardDataObj.name = cardNameInput.value;
  cardDataObj.link = cardImgUrlInput.value;
  const cardElement = createCard(
    cardDataObj,
    deleteCard, 
    initialImagePopup, 
    isLiked
  );
  placesList.prepend(cardElement);
  popupNewCardForm.reset();
  closeModal(popupNewCard);
}

// листенеры
//profile popup
profileEditButton.addEventListener("click", () => {
  fillProfilePopup(
    popupProfileForm,
    profileTitle.textContent,
    profileDescription.textContent,
  );
  openModal(popupProfileEdit);
});

// add card popup
newCardButton.addEventListener("click", () => {
  popupNewCardForm.reset();
  openModal(popupNewCard);
});

// обработчик submit на редактирование профиля
popupProfileForm.addEventListener('submit', handleFormSubmit); 

// обрабочик submit добавления карточки
popupNewCardForm.addEventListener('submit', submitAddCard);

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











