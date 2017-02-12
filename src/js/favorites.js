/******************************************************************
JAVASCRIPT: FAVORITES

******************************************************************/

const btnFavorites = document.querySelector('.btn--favorites');
btnFavorites.addEventListener('click', showFavorites);

function showFavorites() {
    const listWrapper = document.querySelector('.list-wrapper');
    listWrapper.classList.toggle('active');
}
