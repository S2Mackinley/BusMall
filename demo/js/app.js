// globals

/* Globals */

const productNames = ['bag','banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck',
'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass']
// DANGER: DEBUG
// const productNames = ['boots', 'dog-duck', 'tauntaun', 'breakfast', 'bathroom', 'bubblegum'];

const maxClicks = 26;
let roundCtr = 1;

const leftImgElem = document.getElementById('img-left');
const centerImgElem = document.getElementById('img-center');
const rightImgElem = document.getElementById('img-right');
const imagesContainerElem = document.getElementById('images');

let productLeft = null;
let productCenter = null;
let productRight = null;



/* Constructor */
function Product(title, url) {
  this.title = title;
  this.url = url;
  this.tally = 0;
  this.views = 0;


  Product.all.push(this);
}

Product.all = [];

/* Functions */
function createProducts() {
  for (let index = 0; index < productNames.length; index++) {
    const productName = productNames[index];
    new Product(productName, './imgs/' + productName + '.jpg');
  }
}

function renderNewProducts() {
  shuffle(Product.all);
  const noRepeat = [];
  for (let index = 0; index < Product.all.length; index++) {
    const product = Product.all[index];
    if (product !== productLeft && product !== productCenter && product !== productRight) {
      noRepeat.push(product);
      if (noRepeat.length === 3) {
        break;
    }
  }
}


  productLeft = noRepeat[0];
  console.log(productLeft.title);
  productCenter = noRepeat[1];
  console.log(productCenter.title);
  productRight = noRepeat[2];
  console.log(productRight.title);

}

function renderProducts() {

  leftImgElem.src = productLeft.url;
  leftImgElem.alt = productLeft.title;

  centerImgElem.src = productCenter.url;
  centerImgElem.alt = productCenter.title;

  rightImgElem.src = productRight.url;
  rightImgElem.alt = productRight.title;
}

/* fisher yates style shuffle
https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
*/
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

function productClickHandler(event) {

  const productId = event.target.id;
  productLeft.views += 1;
  productCenter.views += 1;
  productRight.views += 1;
  switch (productId) {

    case leftImgElem.id:
      productLeft.tally += 1;
      
      renderNewProducts();
      renderProducts();
      roundCtr += 1;
      break;

    case centerImgElem.id:
      productCenter.tally += 1;

      renderNewProducts();
      renderProducts();
      roundCtr += 1;
      break;

    case rightImgElem.id:
      productRight.tally += 1;
      
      renderNewProducts();
      renderProducts();
      roundCtr += 1;
      break;

    default:
      alert('mind the gap!');
  }

  if (roundCtr === maxClicks) {
    imagesContainerElem.removeEventListener('click', productClickHandler);
    alert('You are out of clicks, Click "View Results" to see what you picked below');
    const resultsButton = document.getElementById('show-results');
    resultsButton.addEventListener('click',renderLikes);
    
  }

}



function renderLikes() {
  const likesListELem = document.getElementById('results-list');
  likesListELem.innerHTML = '';
  for (let i = 0; i < Product.all.length; i++) {
      const itemProduct = Product.all[i];
      const itemProductElem = document.createElement('li');
      likesListELem.appendChild(itemProductElem);
      itemProductElem.textContent = itemProduct.title + ' : ' + itemProduct.tally + ' clicks out of ' + itemProduct.views + " views.";

  }
  renderChart();
}





function renderChart() {

let tallyArray = []
for (let index = 0; index < Product.all.length; index++) {
  const productTally = Product.all[index].tally;
  tallyArray.push(productTally);
  
  
}


  const ctx = document.getElementById('canvas').getContext('2d');
  const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'horizontalBar',

    // The data for our dataset
    data: {
      labels: productNames,
      datasets: [{
        label: 'Which Items Were Clicked Most',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',

        // TODO: get the "good" product data in here
        data: tallyArray
      }]
    },

    // Configuration options go here
    options: {}
  });
}



imagesContainerElem.addEventListener('click', productClickHandler);


createProducts();

renderNewProducts();

renderProducts();

// renderLikes();




// call when done
// renderChart();