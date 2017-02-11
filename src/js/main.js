/******************************************************************
JAVASCRIPT: MAIN

******************************************************************/

// const jsonFile = 'names.json';
// const names = [];

// fetch(jsonFile)
//   .then(blob => blob.json())
//   .then(data => names.push(...data));

// console.log(names);

const names = [
    {
        "name": "Jimmy",
        "sex": "male",
        "shown": false
    },
    {
        "name": "Johnny",
        "sex": "male",
        "shown": false
    },
    {
        "name": "Kurt",
        "sex": "male",
        "shown": false
    },
    {
        "name": "Peter",
        "sex": "male",
        "shown": false
    },
    {
        "name": "Lisa",
        "sex": "female",
        "shown": false
    },
    {
        "name": "Anna",
        "sex": "female",
        "shown": false
    },
    {
        "name": "Gerda",
        "sex": "female",
        "shown": false
    },
    {
        "name": "Frauke",
        "sex": "female",
        "shown": false
    }
];

const colors = [
    {
        "main": "#273438",
        "second": "#6AC9DE",
        "third": "#75DAF0"
    },
    {
        "main": "#2E393C",
        "second": "#E06DA9",
        "third": "#F571B6"
    },
    {
        "main": "#2E393C",
        "second": "#ECE068",
        "third": "#F3E76B"
    },
    {
        "main": "#2E393C",
        "second": "#F39B54",
        "third": "#FCA661"
    },
    {
        "main": "#2E393C",
        "second": "#BE7BE5",
        "third": "#C77FF1"
    },
    {
        "main": "#2E393C",
        "second": "#65D28B",
        "third": "#76F1A0"
    },
    {
        "main": "#2E393C",
        "second": "#8DDC6E",
        "third": "#97EA76"
    }
];


/***********************************************************************
    ON LOAD
************************************************************************/

// mumbl name on load
mumblName();

// listen on click on btn
let btn = document.querySelector('.btn');
btn.addEventListener('click', mumblName);



/***********************************************************************
    FUNCTIONS
************************************************************************/

function resetStatus() {

    // reset status
    names.forEach(function(el) {
        el.shown = false;
    });

    // mumbl a random first name again
    mumblName();
};

function mumblName() {

    // get random name
    const randomName = names[Math.floor(Math.random() * names.length)]; // random name as an object

    // check if name was already shown
    // to prevent that the same name is shown multiple times
    if (randomName.shown === false) {

        // change HTML of name
        const cardName = document.querySelector('.card__heading');
        cardName.innerHTML = randomName.name;

        // change HTML of sex icon
        const cardIcon = document.querySelector('.card__icon');
        cardIcon.innerHTML = (randomName.sex === 'male') ? '&#9794;' : '&#9792;';

        // CSS changes
        const body = document.querySelector('body');
        const card = document.querySelector('.card');
        const cardLogoWrapper = document.querySelector('.card__logo-wrapper');
        btn = document.querySelector('.btn');

        // random color
        const randomColor = colors[Math.floor(Math.random() * colors.length)]; // random color as an object

        // add flip animation
        card.classList.add('flip');

        // CSS color
        body.style.backgroundColor = randomColor.main;
        card.style.backgroundColor = randomColor.second;
        cardLogoWrapper.style.backgroundColor = randomColor.second;
        cardIcon.style.backgroundColor = randomColor.third;
        btn.style.backgroundColor = randomColor.third;

        // remember that this name was already shown
        randomName.shown = true;

        // remove flip animation
        setTimeout(function(){
            card.classList.remove('flip');
        }, 300);

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
