/******************************************************************
JAVASCRIPT: SETTINGS

******************************************************************/

const btnSettings = document.querySelector('.btn--settings');
btnSettings.addEventListener('click', showSettings);

function showSettings() {
    const settingsWrapper = document.querySelector('.settings-wrapper');
    settingsWrapper.classList.toggle('active');
}
