
const openModal = (element) => {
  element.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalOnEscape);
};

const closeModal = (element) => {
  element.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalOnEscape);
};

const closeModalOnEscape = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
};

export { openModal, closeModal, closeModalOnEscape }; 

