const cardTemplate = document.querySelector('#card-template').content;

//функция создания карточки
const createCard = (cardInfo, deleteCard, openImagePopup, isLiked) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;
  cardElement.querySelector('.card__title').textContent = cardInfo.name;
  const likeButton = cardElement.querySelector('.card__like-button');

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function() {
    deleteCard(cardElement);
  });

  cardImage.addEventListener('click', (evt) => {
    openImagePopup(evt);
  });

  likeButton.addEventListener('click', (evt) => {
    isLiked(evt);
  });

  return cardElement;
}

//функция удаления карточки
const deleteCard = function(cardElement) {
  cardElement.remove();
}

//функция проставки лайка
function isLiked(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
};

export { createCard, deleteCard, isLiked }; 