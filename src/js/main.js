/******************************************************************
JAVASCRIPT: MAIN

******************************************************************/

const colors = [
    {
        "main": "#55ADC1",
        "second": "#61D0E8",
        "third": "#6ADCF5"
    },
    {
        "main": "#629BD4",
        "second": "#67A8EA",
        "third": "#73B6F9"
    },
    {
        "main": "#CB659A",
        "second": "#E167A7",
        "third": "#F66BB4"
    },
    {
        "main": "#EAC955",
        "second": "#F1CC4B",
        "third": "#FFDB5A"
    },
    {
        "main": "#EA7951",
        "second": "#F17042",
        "third": "#FF8255"
    },
    {
        "main": "#A465C9",
        "second": "#B970E4",
        "third": "#C972FC"
    },
    {
        "main": "#D35555",
        "second": "#E95151",
        "third": "#FA6060"
    },
    {
        "main": "#5FC081",
        "second": "#61DB8C",
        "third": "#76F1A0"
    }
];



/***********************************************************************
    ON LOAD
************************************************************************/

(function() {

    // initialize empty names arrays
    let names = [];
    let filteredNames = [];
    let favoriteNames = [];
    let currentName = [];

    // listen on submit button of settings
    const btnSubmit = document.querySelector('.settings');
    btnSubmit.addEventListener('submit', saveSettings);
    btnSubmit.addEventListener('submit', animateCard);

    // listen on click on mumbl btn
    let btn = document.querySelector('.btn--mumbl');
    btn.addEventListener('click', mumblName);
    btn.addEventListener('click', animateButton);
    btn.addEventListener('click', animateCard);

    // listen on click on love btn
    let btnLove = document.querySelector('.btn--love');
    btnLove.addEventListener('click', loveName);
    btnLove.addEventListener('click', animateButton);
    btnLove.addEventListener('click', animateCard);

    // listen on click on info btn
    let btnInfo = document.querySelector('.btn--info');
    btnInfo.addEventListener('click', animateButton);
    btnInfo.addEventListener('click', flipCard);
    let cardInfo = document.querySelector('.card');
    cardInfo.addEventListener('click', flipCard);

    // show and hide settings nav
    let btnFavorites = document.querySelector('.btn--favorites');
    btnFavorites.addEventListener('click', showFavorites);

    // show and hide settings nav
    let btnSettings = document.querySelector('.btn--settings');
    btnSettings.addEventListener('click', showSettings);

    // listen on click on favorites and settings btn
    btnSettings.addEventListener('click', animateButton);
    btnFavorites.addEventListener('click', animateButton);

    // listen on click on delete favorite name btn
    let list = document.querySelector('.list');
    list.addEventListener('click', deleteName);

    // listen on click on favorite name
    list.addEventListener('click', showFavoriteName);

    // save names from json file into names array
    loadJSON("json/names.json", function(response) {
        names = JSON.parse(response);
        // console.log((names.filter(el => el.gender === 'male')).length);
        // console.log((names.filter(el => el.gender === 'female')).length);
        initializeMumblApp();
    });



    /***********************************************************************
        FUNCTIONS
    ************************************************************************/

    function loadJSON(file, callback) {

        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', file, true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }

    function initializeMumblApp() {

        // hide loading spinner
        const loadingSpinner = document.querySelector('.loading');
        loadingSpinner.classList.add('hidden');

        // variable for filtered names array (when settings are saved, it gets altered)
        filteredNames = names;

        // mumbl name on load
        mumblName();

        // get currentName
        currentName = names[names.findIndex(el => el.shown)];

        // load and display previously saved favorites
        favoriteNames = JSON.parse(localStorage.getItem('favoriteNames')) || [];
        loadFavorites();
    }

    function resetStatus() {

        // reset status
        filteredNames.forEach(function(el) {
            if (el.loved) return;
            el.shown = false;
        });

        // check if all names have already been loved
        const allLoved = filteredNames.every(function(el) {
            if (el.loved === true) {
                return true;
            }
        });

        // finish mumbl
        if (allLoved === true) {
            return;
        }

        // mumbl a random first name again
        mumblName();
    }

    function changeColors() {

        // CSS changes
        const body = document.querySelector('body');
        const card = document.querySelector('.card');
        const cardInner = document.querySelector('.card__inner');
        const cardLogoWrapper = document.querySelector('.card__logo-wrapper');
        const cardIconWrapper = document.querySelector('.card__icon-wrapper');
        const cardOriginWrapper = document.querySelector('.card__origin-wrapper');
        const listWrapper = document.querySelector('.list-wrapper');
        const settingsWrapper = document.querySelector('.settings-wrapper');
        const listItem = document.querySelectorAll('.list__item');
        btn = document.querySelector('.btn--mumbl');
        btnLove = document.querySelector('.btn--love');
        btnInfo = document.querySelector('.btn--info');
        btnSettings = document.querySelector('.btn--settings');
        btnFavorites = document.querySelector('.btn--favorites');
        const btnSubmit = document.querySelector('.settings__submit');

        // random color
        const randomColor = colors[Math.floor(Math.random() * colors.length)]; // random color as an object

        // CSS color
        body.style.backgroundColor = randomColor.main;
        cardInner.style.backgroundColor = randomColor.second;
        cardLogoWrapper.style.backgroundColor = randomColor.second;
        cardIconWrapper.style.backgroundColor = randomColor.third;
        cardOriginWrapper.style.backgroundColor = randomColor.third;
        listWrapper.style.backgroundColor = randomColor.second;
        settingsWrapper.style.backgroundColor = randomColor.second;
        btn.style.backgroundColor = randomColor.second;
        btnLove.style.backgroundColor = randomColor.second;
        btnInfo.style.backgroundColor = randomColor.second;
        btnSettings.style.backgroundColor = randomColor.second;
        btnFavorites.style.backgroundColor = randomColor.second;
        btnSubmit.style.backgroundColor = randomColor.third;
    }

    function animateCard(e) {

        // get target (love btn or discard btn)
        const clickedBtn = e.currentTarget;

        // add animations
        const card = document.querySelector('.card');
        const logo = document.querySelector('.card__logo');
        if (clickedBtn.getAttribute('data-btn') === 'mumbl') {
            card.classList.add('discard');
            logo.classList.add('rotate-out');

            // remove animations
            setTimeout(function(){
                card.classList.remove('discard');
                logo.classList.remove('rotate-out');
            }, 300);

        } else if (clickedBtn.getAttribute('data-btn') === 'love') {
            card.classList.add('flip');
            logo.classList.add('rotate-in');

            // remove animations
            setTimeout(function(){
                card.classList.remove('flip');
                logo.classList.remove('rotate-in');
            }, 300);
        }
    }

    function flipCard(e) {

        // get meaning of current name and display it
        const cardMeaning = document.querySelector('.card__meaning');
        cardMeaning.innerHTML = currentName.meaning;

        // get origin of current name and display it
        const cardOrigin = document.querySelector('.card__origin');
        cardOrigin.innerHTML = currentName.origin;

        // add animations
        const card = document.querySelector('.card');
        card.classList.toggle('card-flip');
    }

    function animateButton(e) {

        // add animations
        const clickedBtn = e.currentTarget;
        clickedBtn.classList.add('press');

        // remove animations
        setTimeout(function(){
            clickedBtn.classList.remove('press');
        }, 300);
    }

    function saveSettings(e) {

        // prevent page from reloading and submitting the form
        e.preventDefault();

        const maleCheckbox = document.querySelector('#input-male');
        const femaleCheckbox = document.querySelector('#input-female');

        // check for both checkboxes
        if (maleCheckbox.checked && femaleCheckbox.checked) {
            filteredNames = names;

        // check male only
        } else if (maleCheckbox.checked && !femaleCheckbox.checked) {
            filteredNames = names.filter(el => el.gender === 'male');

        // check female only
        } else if (!maleCheckbox.checked && femaleCheckbox.checked) {
            filteredNames = names.filter(el => el.gender === 'female');

        // check none, which sets both to true
        } else {
            maleCheckbox.checked = true;
            femaleCheckbox.checked = true;
            filteredNames = names;
        }

        // close settings
        showSettings();

        // mumbl a new filtered name
        mumblName();
    }

    function showSettings() {
        const settingsWrapper = document.querySelector('.settings-wrapper');
        const listWrapper = document.querySelector('.list-wrapper');
        if (listWrapper.classList.contains('active') && window.innerWidth < 961) listWrapper.classList.remove('active');
        settingsWrapper.classList.toggle('active');
    }

    function showFavorites() {
        const settingsWrapper = document.querySelector('.settings-wrapper');
        const listWrapper = document.querySelector('.list-wrapper');
        if (settingsWrapper.classList.contains('active') && window.innerWidth < 961) settingsWrapper.classList.remove('active');
        listWrapper.classList.toggle('active');
    }

    function mumblName() {

        // get random name as an object
        const randomName = filteredNames[Math.floor(Math.random() * filteredNames.length)];

        // check if name was already shown
        // to prevent that the same name is shown multiple times
        if (randomName.shown === false && randomName.loved === false) {

            // change HTML of name
            const cardName = document.querySelector('.card__heading');
            cardName.innerHTML = randomName.name;

            // change HTML of gender icon
            const cardIcon = document.querySelector('.card__icon');
            cardIcon.style.backgroundImage = (randomName.gender === 'male') ? 'url(img/icon-male.svg)' : 'url(img/icon-female.svg)';

            // change colors and add animation
            changeColors();

            // remember that this name was already shown
            randomName.shown = true;

            // save current name
            currentName = randomName;

            // flip card back to original position
            const card = document.querySelector('.card');
            if (card.classList.contains('card-flip')) card.classList.remove('card-flip');

        } else {

            // check if all names have already been shown
            const allShown = filteredNames.every(function(el) {
                if (el.shown === true) {
                    return true;
                }
            });

            // reset shown status
            if (allShown === true) {
                resetStatus();
            } else {
                mumblName();
            }
        }
    }

    function loadFavorites() {

        // cycle through all favorite names
        favoriteNames.forEach(function(el) {

            // create and append list item
            const newListItem = document.createElement('li');
            const newListItemText = document.createTextNode(`${el.name}`);
            newListItem.className = 'list__item';
            newListItem.setAttribute('data-name', `${el.name}`);
            newListItem.setAttribute('data-role', 'favorite');
            newListItem.appendChild(newListItemText);
            list.appendChild(newListItem);

            // create and append gender icon
            const newGenderIcon = document.createElement('span');
            newGenderIcon.className = 'list__item__icon btn--delete';
            newGenderIcon.setAttribute('data-btn', 'delete');
            newGenderIcon.style.backgroundImage = (el.gender === 'male') ? 'url(img/icon-male.svg)' : 'url(img/icon-female.svg)';
            newListItem.appendChild(newGenderIcon);

            // get rid of placeholder
            const favoritesPlaceholder = document.querySelector('.list__item[data-role="placeholder"]');
            if (!(favoritesPlaceholder.style.display === 'none')) favoritesPlaceholder.style.display = 'none';
        });
    }

    function loveName() {

        // check if name is not already marked as loved
        if (currentName.loved) return;

        // mark name as loved
        currentName.loved = true;

        // push to favorites array
        favoriteNames.push(currentName);

        // save to local storage
        localStorage.setItem('favoriteNames', JSON.stringify(favoriteNames));

        // save name to loved list
        list = document.querySelector('.list');

        // create and append list item
        const newListItem = document.createElement('li');
        const newListItemText = document.createTextNode(`${currentName.name}`);
        newListItem.className = 'list__item';
        newListItem.setAttribute('data-name', `${currentName.name}`);
        newListItem.setAttribute('data-role', 'favorite');
        newListItem.appendChild(newListItemText);
        list.appendChild(newListItem);

        // create and append gender icon
        const newGenderIcon = document.createElement('span');
        newGenderIcon.className = 'list__item__icon btn--delete';
        newGenderIcon.setAttribute('data-btn', 'delete');
        newGenderIcon.style.backgroundImage = (currentName.gender === 'male') ? 'url(img/icon-male.svg)' : 'url(img/icon-female.svg)';
        newListItem.appendChild(newGenderIcon);

        // get rid of placeholder
        const favoritesPlaceholder = document.querySelector('.list__item[data-role="placeholder"]');
        if (!(favoritesPlaceholder.style.display === 'none')) favoritesPlaceholder.style.display = 'none';

        // mumbl next name
        setTimeout(function(){
            mumblName();
        }, 300);
    }

    function deleteName(e) {

        // get the clicked element
        const clickedElement = e.target;

        // leave if the target is not a name (e.g. no names have been added to the favorites list yet)
        if (clickedElement.getAttribute('data-btn') !== 'delete') return;

        // find out which name was clicked
        const deletedElement = clickedElement.parentElement;
        const deletedElementName = deletedElement.getAttribute('data-name');
        const deletedName = names.filter(el => el.name === deletedElementName);
        const deletedNameIndex = favoriteNames.findIndex(el => el.name === deletedName[0].name);

        // change loved status back to false
        deletedName[0].loved = false;

        // remove from favorites array
        if (deletedNameIndex > -1) favoriteNames.splice(deletedNameIndex, 1);

        // save to local storage
        localStorage.setItem('favoriteNames', JSON.stringify(favoriteNames));

        // delete name from favorites list
        list = document.querySelector('.list');
        deletedElement.classList.add('fade-out');

        // remove animations
        setTimeout(function(){
            list.removeChild(deletedElement);

            // if favorites list is empty, add placeholder
            const favoritesPlaceholder = document.querySelector('.list__item[data-role="placeholder"]');
            if (!favoriteNames.length && favoritesPlaceholder.style.display === 'none') {
                favoritesPlaceholder.style.display = 'block';
            }
        }, 300);
    }

    function showFavoriteName(e) {

        // get the clicked element
        const clickedElement = e.target;

        // leave if the target is not a name (e.g. no names have been added to the favorites list yet) or the delete btn
        if (clickedElement.getAttribute('data-role') !== 'favorite') return;

        // find out which name was clicked
        const clickedElementName = clickedElement.getAttribute('data-name');
        const clickedName = names.filter(el => el.name === clickedElementName);
        // const clickedNameIndex = favoriteNames.findIndex(el => el.name === clickedName[0].name);

        // change HTML of name
        const cardName = document.querySelector('.card__heading');
        cardName.innerHTML = clickedName[0].name;

        // change HTML of gender icon
        const cardIcon = document.querySelector('.card__icon');
        cardIcon.style.backgroundImage = (clickedName[0].gender === 'male') ? 'url(img/icon-male.svg)' : 'url(img/icon-female.svg)';

        // get meaning of current name and display it
        const cardMeaning = document.querySelector('.card__meaning');
        cardMeaning.innerHTML = clickedName[0].meaning;

        // get origin of current name and display it
        const cardOrigin = document.querySelector('.card__origin');
        cardOrigin.innerHTML = clickedName[0].origin;

        // change colors and add animation
        changeColors();

        // save current name
        currentName = clickedName[0];

        if (clickedName[0].loved === false) clickedName[0].loved = true;

        // add animations
        const card = document.querySelector('.card');
        const logo = document.querySelector('.card__logo');
        card.classList.add('discard');

        // remove animations
        setTimeout(function(){
            card.classList.remove('discard');
        }, 300);

        // flip card back to original position
        if (card.classList.contains('card-flip')) card.classList.remove('card-flip');

        // close favorite names list on mobile
        const listWrapper = document.querySelector('.list-wrapper');
        if (listWrapper.classList.contains('active') && window.innerWidth < 961) listWrapper.classList.remove('active');
    }

}());
