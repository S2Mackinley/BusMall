// globals

/* Globals */

const productNames = ['Bag','Banana', 'Bathroom', 'Boots', 'Breakfast', 'Bubblegum', 'Chair', 'Cthulhu', 'Dog-Duck',
'Dragon', 'Pen', 'Pet-Sweep', 'Scissors', 'Shark', 'Sweep', 'Tauntaun', 'Unicorn', 'Usb', 'Water-Can', 'Wine-Glass']
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
function createProductsFromScratch() {
  for (let i = 0; i < productNames.length; i++) {
    const productName = productNames[i];
    new Product(productName, './imgs/' + productName + '.jpg');
  }
}

function createProductsFromStorage(storageGet) {
  const javaScriptPics = JSON.parse(storageGet);
  
  for (let i = 0; i < javaScriptPics.length; i++) {
    const rawData = javaScriptPics[i];
    const newPictureInstance = new Product (rawData.title,rawData.url);
    newPictureInstance.tally = rawData.tally;
    newPictureInstance.views = rawData.views;
    
    
  }
}

function createPicInstances() {
  const storageGet = localStorage.getItem('totalClicks');
  if(storageGet === null) {
    createProductsFromScratch();
  } else {
    createProductsFromStorage(storageGet);
  }

}



// picks new images while not repeating
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
  // console.log(productLeft.title);
  productCenter = noRepeat[1];
  // console.log(productCenter.title);
  productRight = noRepeat[2];
  // console.log(productRight.title);

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

function resetLikes() {
  localStorage.clear();
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
    const JSONImages = JSON.stringify(Product.all);
    console.log(JSONImages);

    localStorage.setItem('totalClicks', JSONImages);

    // updateChartVotes();

    alert('You are out of clicks, Click "View Results" to see what you picked below');
    const resultsButton = document.getElementById('show-results');
    resultsButton.addEventListener('click',renderLikes);

    const resetButton = document.getElementById('reset-results');
    resetButton.addEventListener('click',resetLikes)

  }

}



function renderLikes() {
  const likesListELem = document.getElementById('results-list');
  likesListELem.innerHTML = '<h3> RESULTS </h3>';
  console.log(Product.all);
  for (let i = 0; i < Product.all.length; i++) {
      const itemProduct = Product.all[i];
      const itemProductElem = document.createElement('li');
      itemProductElem.textContent = itemProduct.title + ' : ' + itemProduct.tally + ' clicks out of ' + itemProduct.views + " views.";
      likesListELem.appendChild(itemProductElem);
      

  }
  renderChart();
}





function renderChart() {
let viewsArray = []
let tallyArray = []
let productTitle = []
for (let index = 0; index < Product.all.length; index++) {
  const productTally = Product.all[index].tally;
  const productViews =Product.all[index].views;
  const productName = Product.all[index].title;
  tallyArray.push(productTally);
  viewsArray.push(productViews);
  productTitle.push(productName);
  

  
}


  const ctx = document.getElementById('canvas').getContext('2d');
  const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'horizontalBar',

    // The data for our dataset
    data: {
      labels: productTitle,
      datasets: [{
        label: 'How Many Times Product Was Clicked',
        backgroundColor: 'rgb(34,139,34)',
        borderColor: 'rgb(255, 99, 132)',
        data: tallyArray,
      },
      {
        label: 'How many Times Products Were Viewed',
        backgroundColor: 'rgb(128,128,128)',
        borderColor: 'rgb(255, 99, 132)',
        data: viewsArray
    }] 
    },

    // Configuration options go here
    options: {}
  });
}


imagesContainerElem.addEventListener('click', productClickHandler);



createPicInstances();


renderNewProducts();

renderProducts();



// localStorage.clear();
