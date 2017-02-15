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
        "main": "#D7C75C",
        "second": "#ECD95A",
        "third": "#F4E05B"
    },
    {
        "main": "#E29150",
        "second": "#F5974C",
        "third": "#FDA35A"
    },
    {
        "main": "#A465C9",
        "second": "#B970E4",
        "third": "#C673F6"
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

changeColors();

function changeColors() {

    // CSS changes
    const body = document.querySelector('body');
    const cardInner = document.querySelector('.card__inner');
    const cardLogoWrapper = document.querySelector('.card__logo-wrapper');
    const cardIconWrapper = document.querySelector('.card__icon-wrapper');

    // random color
    const randomColor = colors[Math.floor(Math.random() * colors.length)]; // random color as an object

    // CSS color
    body.style.backgroundColor = randomColor.main;
    cardInner.style.backgroundColor = randomColor.second;
    cardLogoWrapper.style.backgroundColor = randomColor.second;
    cardIconWrapper.style.backgroundColor = randomColor.third;
}
