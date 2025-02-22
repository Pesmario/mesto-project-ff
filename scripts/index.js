const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

const deleteCard = (cardElement) => {
  cardElement.remove();
}

const createCard = (cardInfo, deleteCard) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;
  cardElement.querySelector('.card__title').textContent = cardInfo.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => deleteCard(cardElement));

  return cardElement;
} 

initialCards.forEach(function(cardElement) {
  const newCard = createCard(cardElement, deleteCard);
  placesList.append(newCard);
});











