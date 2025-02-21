const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

const deleteCard = (cardElement) => {
  cardElement.remove();
}

const createCard = (initialCards, deleteCard) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = initialCards.link;
  cardImage.alt = initialCards.name;
  cardElement.querySelector('.card__title').textContent = initialCards.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => deleteCard(cardElement));

  return cardElement;
} 

initialCards.forEach(function(cardElement) {
  createCard(cardElement, deleteCard);
  const newCard = createCard(cardElement, deleteCard);
  placesList.append(newCard);
});











