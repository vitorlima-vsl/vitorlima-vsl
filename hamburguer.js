const btnHamburguer = document.querySelector('.header__meio__hamburguer');
const hamburguerModal = document.querySelector('.hamburguer__modal');
const btnCloseModal = document.querySelector('.hamburguer__modal__close-modal');
const btnsAnchorModal = document.querySelectorAll('.AnchorsModal')

btnHamburguer.addEventListener('click', () => {
    hamburguerModal.style.display = "block";
});
btnCloseModal.addEventListener('click', () => {
    hamburguerModal.style.display = "none";
});

btnsAnchorModal.forEach(btn => {
    btn.addEventListener('click', () => {
        hamburguerModal.style.display = "none";
    });
});