/******************************************************************
JAVASCRIPT: MAIN

******************************************************************/

const names = [
    {
        "name": "Jimmy",
        "sex": "male",
        "shown": false,
        "loved": false
    },
    {
        "name": "Johnny",
        "sex": "male",
        "shown": false,
        "loved": false
    },
    {
        "name": "Kurt",
        "sex": "male",
        "shown": false,
        "loved": false
    },
    {
        "name": "Peter",
        "sex": "male",
        "shown": false,
        "loved": false
    },
    {
        "name": "Lisa",
        "sex": "female",
        "shown": false,
        "loved": false
    },
    {
        "name": "Anna",
        "sex": "female",
        "shown": false,
        "loved": false
    },
    {
        "name": "Gerda",
        "sex": "female",
        "shown": false,
        "loved": false
    },
    {
        "name": "Horst",
        "sex": "male",
        "shown": false,
        "loved": false
    },
    {
        "name": "Seppl",
        "sex": "male",
        "shown": false,
        "loved": false
    },
    {
        "name": "Manfredo",
        "sex": "male",
        "shown": false,
        "loved": false
    },
    {
        "name": "Herbert",
        "sex": "male",
        "shown": false,
        "loved": false
    },
    {
        "name": "Ursula",
        "sex": "female",
        "shown": false,
        "loved": false
    },
    {
        "name": "Frauke",
        "sex": "female",
        "shown": false,
        "loved": false
    }
];

const colors = [
    {
        "main": "#66B2C3",
        "second": "#6AC9DE",
        "third": "#75DAF0"
    },
    {
        "main": "#CA6C9D",
        "second": "#E06DA9",
        "third": "#F571B6"
    },
    {
        "main": "#DAD06F",
        "second": "#ECDF59",
        "third": "#F4E75B"
    },
    {
        "main": "#DE9459",
        "second": "#F5974C",
        "third": "#FDA35A"
    },
    {
        "main": "#B27CD1",
        "second": "#BE7BE5",
        "third": "#C77FF1"
    },
    {
        "main": "#6BC48A",
        "second": "#65D28B",
        "third": "#76F1A0"
    },
    {
        "main": "#8DCE73",
        "second": "#8DDC6E",
        "third": "#97EA76"
    }
];

// const jsonFile = 'names.json';
// const names = [];

// fetch(jsonFile)
//   .then(blob => blob.json())
//   .then(data => names.push(...data));

// console.log(names);


/***********************************************************************
    ON LOAD
************************************************************************/

// mumbl name on load
mumblName();

// listen on click on mumbl btn
let btn = document.querySelector('.btn--mumbl');
btn.addEventListener('click', mumblName);
btn.addEventListener('click', animateButton);
btn.addEventListener('click', animateCard);

// get currentName
let currentName = names[names.findIndex(el => el.shown)];

// new array for favorites
let favoriteNames = [];

// listen on click on love btn
let btnLove = document.querySelector('.btn--love');
btnLove.addEventListener('click', loveName);
btnLove.addEventListener('click', animateButton);
btnLove.addEventListener('click', animateCard);

// listen on click on delete btn
// let btnDelete = document.querySelectorAll('.btn--delete');
// btnDelete.forEach(el => el.addEventListener('click', deleteName));



/***********************************************************************
    FUNCTIONS
************************************************************************/

function resetStatus() {

    // reset status
    names.forEach(function(el) {
        if (el.loved) return;
        el.shown = false;
    });

    // check if all names have already been loved
    const allLoved = names.every(function(el) {
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
};

function changeColors() {

    // CSS changes
    const body = document.querySelector('body');
    const card = document.querySelector('.card');
    const cardInner = document.querySelector('.card__inner');
    const cardLogoWrapper = document.querySelector('.card__logo-wrapper');
    const cardIconWrapper = document.querySelector('.card__icon-wrapper');
    const listWrapper = document.querySelector('.list-wrapper');
    // const listHeadingWrapper = document.querySelector('.list__heading-wrapper');
    const listItem = document.querySelectorAll('.list__item');
    // const listIcon = document.querySelector('.list__icon');
    btn = document.querySelector('.btn--mumbl');
    btnLove = document.querySelector('.btn--love');
    const btnFavorites = document.querySelector('.btn--favorites');

    // random color
    const randomColor = colors[Math.floor(Math.random() * colors.length)]; // random color as an object

    // CSS color
    body.style.backgroundColor = randomColor.main;
    cardInner.style.backgroundColor = randomColor.second;
    cardLogoWrapper.style.backgroundColor = randomColor.second;
    cardIconWrapper.style.backgroundColor = randomColor.third;
    // listItem.forEach(el => el.style.color = randomColor.second);
    listWrapper.style.backgroundColor = randomColor.second;
    // listHeadingWrapper.style.backgroundColor = randomColor.first;
    // listIcon.style.backgroundColor = randomColor.third;
    btn.style.backgroundColor = randomColor.second;
    btnLove.style.backgroundColor = randomColor.second;
    btnFavorites.style.backgroundColor = randomColor.main;
}

function animateCard(e) {

    // get target (love btn or discard btn)
    const clickedBtn = e.currentTarget;

    // add animations
    const card = document.querySelector('.card');
    if (clickedBtn.getAttribute('data-btn') === 'mumbl') {
        card.classList.add('discard');

        // remove animations
        setTimeout(function(){
            card.classList.remove('discard');
        }, 300);

    } else if (clickedBtn.getAttribute('data-btn') === 'love') {
        card.classList.add('flip');

        // remove animations
        setTimeout(function(){
            card.classList.remove('flip');
        }, 300);
    }
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

function mumblName() {

    // get random name
    const randomName = names[Math.floor(Math.random() * names.length)]; // random name as an object

    // check if name was already shown
    // to prevent that the same name is shown multiple times
    if (randomName.shown === false && randomName.loved === false) {

        // change HTML of name
        const cardName = document.querySelector('.card__heading');
        cardName.innerHTML = randomName.name;

        // change HTML of sex icon
        const cardIcon = document.querySelector('.card__icon');
        cardIcon.style.backgroundImage = (randomName.sex === 'male') ? 'url(img/icon-male.svg)' : 'url(img/icon-female.svg)';

        // change colors and add animation
        changeColors();

        // remember that this name was already shown
        randomName.shown = true;

        // save current name
        currentName = randomName;

    } else {

        // check if all names have already been shown
        const allShown = names.every(function(el) {
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

function loveName() {

    // check if name is not already marked as loved
    if (currentName.loved) return;

    // push to favorites array
    favoriteNames.push(currentName);

    // mark name as loved
    currentName.loved = true;

    // save name to loved list
    const list = document.querySelector('.list');
    const newListItem = document.createElement('li');
    // const newDeleteButton = document.createElement('a');
    // const newDeleteIcon = document.createElement('span');
    // const newDeleteIconText = document.createTextNode('x');
    const newListItemText = document.createTextNode(`${currentName.name}`);

    newListItem.className = 'list__item';
    newListItem.setAttribute('data-name', `${currentName.name}`);
    newListItem.appendChild(newListItemText);

    // newDeleteButton.className = 'btn btn--delete';
    // newDeleteButton.setAttribute('href', '#');
    // newDeleteIcon.className = 'btn__icon btn__icon--x';
    // newDeleteIcon.appendChild(newDeleteIconText);

    // newListItem.appendChild(newDeleteButton);
    // newDeleteButton.appendChild(newDeleteIcon);

    list.appendChild(newListItem);

    // get rid of placeholder
    const favoritesPlaceholder = document.querySelector('.list__item[data-role="placeholder"]');
    if (favoritesPlaceholder !== null) list.removeChild(favoritesPlaceholder);

    // mumbl next name
    mumblName();
}

// function deleteName(e) {

//     // find out which name was clicked
//     const deletedElement = e.currentTarget.parentElement.getAttribute('data-name');
//     const deletedName = names.filter(el => el.name === deletedElement);

//     // change loved status back to false
//     deletedName.loved = false;

//     // delete name from favorites list
//     const list = document.querySelector('.list');
//     list.removeChild(deletedElement);
// }
