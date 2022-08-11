let canvas;
let bg;
let buttonsImage;
let URLUser = `https://randomuser.me/api/`;
let user = null;
let URLBit = `https://api.coindesk.com/v1/bpi/currentprice.json`;
let bit = null;
let URLUsaPopulation = `https://datausa.io/api/data?drilldowns=Nation&measures=Population`;
let usaPopulation = null;
let year = 0;
let URLDog = `https://dog.ceo/api/breeds/image/random`;
let dog = null;
let imageDog;
let URLCat = `https://catfact.ninja/fact`;
let catFact = null;
let buttons = [];
let button;
let screen = 0;

function setup() {
  frameRate(60);
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('z-index', '-1');
  canvas.style('position', 'fixed');
  canvas.style('top', '0');
  canvas.style('right', '0');

  bg = loadImage(`images/bg.jpg`)
  buttonsImage = loadImage(`images/buttonsImage.png`)

  fetch(URLUser)
    .then(response => response.json())
    .then(data => {
      user = data
    });

  fetch(URLBit)
    .then(response => response.json())
    .then(data => {
      bit = data
    });

  fetch(URLUsaPopulation)
    .then(response => response.json())
    .then(data => {
      usaPopulation = data
      console.log(usaPopulation)
    });

  fetch(URLDog)
    .then(response => response.json())
    .then(data => {
      dog = data
      imageDog = loadImage(dog.message);
    });

  fetch(URLCat)
    .then(response => response.json())
    .then(data => {
      catFact = data
    });

  for (let i = 0; i < 2; i++) {
    buttons[i] = new Array(2);
    for (let j = 0; j < 2; j++) {
      buttons[i][j] = new Buttons((200 * i) + 100, (200 * j) + 75);
      button = new Buttons((200 * i), (450 * j));
    }
  }
}

function draw() {
  //background(0, 50);
  background(0);
  newCursor();

  image(bg, 0, 0);

  fill(255)
  textSize(20);
  textWrap(WORD);
  

  switch (screen) {
    case 0:
      image(buttonsImage, 0, 0);
      text(`User                           BitCoin`, 125, 200);
      text(`USA                             Dog`, 125, 400);
      text(`Cat`, 225, 570);
      break;

    case 1:
      text(
        `Name: ${user.results[0].name.first}
        Last Name: ${user.results[0].name.last}
        Gender: ${user.results[0].gender}
        City: ${user.results[0].location.city}
        Country: ${user.results[0].location.country}
        Email: ${user.results[0].email}`, 100, 50, 500);
        instructions(`space`, 300);
      break;

    case 2:
      text(
        `${bit.chartName} Price

          ${bit.bpi.EUR.rate} ${bit.bpi.EUR.code}
          ${bit.bpi.GBP.rate} ${bit.bpi.GBP.code}
          ${bit.bpi.USD.rate} ${bit.bpi.USD.code} 
          
          update: ${bit.time.updated}`, 100, 50, 400);
      break;

    case 3:
      text(
        `${usaPopulation.data[0].Nation} Population
  
        Año ${usaPopulation.data[year].Year}: ${usaPopulation.data[year].Population}
       
        Referenced from: ${usaPopulation.source[0].name}`,
         100, 50, 500);
         instructions(`down arrow`, 250);


      break;

    case 4:
      image(imageDog, 100, 50, 300, 300);
      instructions(`space`,400);
      break;

    case 5:
      text(catFact.fact, 100, 50, 300);
      instructions(`space`, 350);
      break;
  }
  if (screen !== 0) {
    back();
  }

  function back() {
    text(`<`, 50, 50, 300);
  }

  function instructions(ins, y){
    fill(65,219,240);
    textSize(30);
    text(`Press ${ins}`, 100, y)
  }
}

function mouseClicked() {
  if (screen === 0) {
    if (buttons[0][0].click()) {
      screen = 1
    } else if (buttons[1][0].click()) {
      screen = 2
    } else if (buttons[0][1].click()) {
      screen = 3
    } else if (buttons[1][1].click()) {
      screen = 4
    } else if (button.click()) {
      screen = 5
    }
  }
  if (screen > 0) {
    if (mouseX > 50 && mouseX < (50 + 20) && mouseY > 50 && mouseY < (50 + 20)) {
      screen = 0;
    }
  }
}

function keyPressed() {
  if (keyCode === 32) {
    switch (screen) {
      case 1:
        fetch(URLUser)
          .then(response => response.json())
          .then(data => {
            user = data
          });
        break;
      case 4:
        fetch(URLDog)
          .then(response => response.json())
          .then(data => {
            dog = data
            imageDog = loadImage(dog.message);
          });
        break;
      case 5:
        fetch(URLCat)
          .then(response => response.json())
          .then(data => {
            catFact = data
          });
        break;
    }
  }

  if(keyCode === DOWN_ARROW && year < 7 && screen === 3){
    year ++;
  }
  if(year === 7 && screen === 3){
    year = 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function newCursor() {
  noStroke();
  fill(255);
  ellipse(pmouseX, pmouseY, 10, 10);
}