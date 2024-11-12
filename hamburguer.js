const btnHamburguer = document.querySelector('.header__meio__hamburguer');
const hamburguerModal = document.querySelector('.hamburguer__modal');
const btnCloseModal = document.querySelector('.hamburguer__modal__close-modal');
const btnsAnchorModal = document.querySelectorAll('.AnchorsModal');
const modalContainer = document.querySelector('.hamburguer__modal__container');


btnHamburguer.addEventListener('click', () => {
    hamburguerModal.style.display = "block";
    hamburguerModal.style.width = "100%";
    hamburguerModal.style.animation = "modal .3s";

    modalContainer.style.display = "block";
    modalContainer.style.width = "75%";
    modalContainer.style.animation = "modalContainer .3s";

});
btnCloseModal.addEventListener('click', () => {
    hamburguerModal.style.width = "0%";
    hamburguerModal.style.display = "none";

    modalContainer.style.width = "0%";
    modalContainer.style.display = "none";
});
hamburguerModal.addEventListener('click', () => {

    hamburguerModal.style.width = "0%";
    hamburguerModal.style.display = "none";

    modalContainer.style.width = "0%";
    modalContainer.style.display = "none";
});
btnsAnchorModal.forEach(btn => {
    btn.addEventListener('click', () => {
        hamburguerModal.style.display = "none";
        modalContainer.style.display = "none";
    });
});