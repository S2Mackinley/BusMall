'use strict';

//set these at top for easy/safe use later in script
const imageAllTag = document.getElementById('three-images');
const imageOneTag = document.getElementById('image1');
const imageOneCaption = document.getElementById('image1-P');
const imageTwoTag = document.getElementById('image2');
const imageTwoCaption = document.getElementById('image2-P');
const imageThreeTag = document.getElementById('image3');
const imageThreeCaption = document.getElementById('image3-P');

const maxClicks = 25;
let totalClicks = 0;

//image/caption constructor function
function Picture(caption, url) {
    this.caption = caption;
    this.url = url;
    this.clickctr = 0;
    this.displayctr = 0;

    Picture.all.push(this);
};

//declares empty array to be pushed to later
Picture.all = [];

// instantiate picture objects
new Picture('Bag', './img/bag.jpg');
new Picture('Banana', './img/banana.jpg');
new Picture('Bathroom', './img/bathroom.jpg');
new Picture('Boots', './img/boots.jpg');
new Picture('Breakfast', './img/breakfast.jpg');
new Picture('Bubblegum', './img/bubblegum.jpg');
new Picture('Chair', './img/chair.jpg');
new Picture('Cthulhu', './img/cthulhu.jpg');
new Picture('Dog-duck', './img/dog-duck.jpg');
new Picture('Dragon', './img/dragon.jpg');
new Picture('Pen', './img/pen.jpg');
new Picture('Pet-sweep', './img/pet-sweep.jpg');
new Picture('Scissors', './img/scissors.jpg');
new Picture('Shark', './img/shark.jpg');
new Picture('Sweep', './img/sweep.png');
new Picture('Tauntaun', './img/tauntaun.jpg');
new Picture('Unicorn', './img/unicorn.jpg');
new Picture('Usb', './img/usb.gif');
new Picture('Water-can', './img/water-can.jpg');
new Picture('Wine-glass', './img/wine-glass.jpg');

//will be defined soon
let leftImageObject = null;
let centerImageObject = null;
let rightImageObject = null;

function shuffle(array) {
    for (let i = array.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}

function pickNewImages() {

    shuffle(Picture.all);

    leftImageObject = Picture.all[0];
    centerImageObject = Picture.all[1];
    rightImageObject = Picture.all[2];

    leftImageObject.displayctr += 1;
    centerImageObject.displayctr += 1;
    rightImageObject.displayctr += 1;

    renderNewImages();
    totalClicks += 1;
}

function renderNewImages() {
    imageOneTag.src = leftImageObject.url;
    imageOneTag.alt = leftImageObject.caption;
    imageOneCaption.textContent = leftImageObject.caption;

    imageTwoTag.src = centerImageObject.url;
    imageTwoTag.alt = centerImageObject.caption;
    imageTwoCaption.textContent = centerImageObject.caption;

    imageThreeTag.src = rightImageObject.url;
    imageThreeTag.alt = rightImageObject.caption;
    imageThreeCaption.textContent = rightImageObject.caption;
}

function pictureClickHandler(event) {

    if (totalClicks <= maxClicks) {
        const clickedID = event.target.id;
        if(clickedID === 'image1') {
            leftImageObject.clickctr += 1;
        } else if (clickedID === 'image2') {
            centerImageObject.clickctr += 1;
        } else if (clickedID === 'image3') {
            rightImageObject.clickctr += 1;
        }
    }

    pickNewImages();
    if (totalClicks >= maxClicks) {
        imageAllTag.removeEventListener('click', pictureClickHandler);
        alert('You are out of clicks. Scroll down for results <3');
        renderLikes();
    }
}


function renderLikes() {
    const likesListELem = document.getElementById('Results');
    likesListELem.innerHTML = '';
    for (let i = 0; i < Picture.all.length; i++) {
        const itemPicture = Picture.all[i];
        const itemPictureElem = document.createElement('li');
        likesListELem.appendChild(itemPictureElem);
        itemPictureElem.textContent = itemPicture.caption + ' : ' +
        itemPicture.clickctr;
    }
}

pickNewImages();
console.log(totalClicks);
console.log(maxClicks);


imageAllTag.addEventListener('click', pictureClickHandler);
renderLikes();