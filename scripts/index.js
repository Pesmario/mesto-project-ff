const placesList = document.querySelector('.places__list');

function addCard(initialCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  
  cardItem.querySelector('.card__image').src = initialCard.link;
  cardItem.querySelector('.card__image').alt = initialCard.name;
  cardItem.querySelector('.card__title').textContent = initialCard.name;

  placesList.append(cardItem);

  const deleteButton = cardItem.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => cardItem.remove());
}

initialCards.forEach(addCard);