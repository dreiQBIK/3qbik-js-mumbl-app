/******************************************************************
JAVASCRIPT: MAIN

******************************************************************/

// const jsonFile = 'names.json';
// const names = [];

// fetch(jsonFile)
//   .then(blob => blob.json())
//   .then(data => names.push(...data));

//   console.log(names);

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

        // add flip animation
        card.classList.add('flip');

        // CSS color
        // ... for female names
        if (randomName.sex === 'female') {
            body.style.backgroundColor = '#933465';
            card.style.backgroundColor = '#CD428A';
            cardLogoWrapper.style.backgroundColor = '#CD428A';
            cardIcon.style.backgroundColor = '#E85AA4';
            btn.style.backgroundColor = '#E85AA4';

        // ... for male names
        } else {
            body.style.backgroundColor = '#3A98AC';
            card.style.backgroundColor = '#4CC0D9';
            cardLogoWrapper.style.backgroundColor = '#4CC0D9';
            cardIcon.style.backgroundColor = '#64CFE6';
            btn.style.backgroundColor = '#64CFE6';
        }

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
