const btnHamburguer = document.querySelector('.header__meio__hamburguer');
const hamburguerModal = document.querySelector('.hamburguer__modal');
const btnCloseModal = document.querySelector('.hamburguer__modal__close-modal');
const btnsAnchorModal = document.querySelectorAll('.AnchorsModal');
const modalContainer = document.querySelector('.hamburguer__modal__container');
const searchs = document.querySelectorAll('.search__input');

const modalProcura = document.querySelector('.modalProcura');
const cliqueParaSair = document.querySelector('.clique-para-sair');

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

searchs.forEach(search => {
    search.addEventListener('keyup', () => {
        search.value = '';
       modalProcura.style.display = "block";
    });
});

cliqueParaSair.addEventListener('click', () => {
    modalProcura.style.display = "none";
});