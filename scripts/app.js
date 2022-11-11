//The start of the journey
document.addEventListener("DOMContentLoaded", init); //page loads and does the init() function


// function init() {
const grid = document.querySelector(".grid");
const start = document.querySelector(".startBtn");
const graphics = document.querySelector(".graphicsBtn");
const sound = document.querySelector("soundBtn");
const scoreDisplay = document.querySelector("#score-display");
const cells = [];
const width = 20;
const gridCellCount = width * width;

let missilePosition;
let playerPosition = 389;
let alienPosition = 9;
let interval;
let travelDistance = 19;

function init() {
  createGrid();
  window.addEventListener("keydown", movePlayer);
  window.addEventListener("keydown", playerShoot);
}
//todo function startGame(){} playerplace, alienplace and move
function createGrid() {
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement("div");
    cell.setAttribute("data-index", i);
    cells.push(cell);
    grid.appendChild(cell);
  }
  placePlayer(playerPosition);
  placeAlien(alienPosition);
  // moveAlien()
}

function placePlayer(cellNumber) {
  cells[cellNumber].classList.add("player");
}
function placeAlien(cellNumber) {
  cells[cellNumber].classList.add("alien");
}
//player controls
function movePlayer(event) {
  const x = playerPosition % width;
  const y = Math.floor(playerPosition / width);
  console.log(x, y);
  if (event.key === "ArrowRight" && x < width - 1) {
    moveRight();
  } else if (event.key === "ArrowLeft" && x > 0) {
    moveLeft();
  }
}
function moveRight() {
  removePlayer(playerPosition);
  playerPosition++;
  placePlayer(playerPosition);
}
function moveLeft() {
  removePlayer(playerPosition);
  playerPosition--;
  placePlayer(playerPosition);
}
function removePlayer(cellNumber) {
  cells[cellNumber].classList.remove("player");
}

//ToDo rough beginning shoot - need to put the stopper on spam shoot
// let ableToShoot = true

function playerShoot(event) {
  if (event.keyCode === 32) {
    missilePosition = playerPosition - 20;
    cells[missilePosition].classList.add("missile");
    startMissile();
  }
}
function removeMissile(cellNumber) {
  cells[missilePosition].classList.remove("missile");
}
function addMissile(cellNumber) {
  cells[missilePosition].classList.add("missile");
}
function startMissile() {
  interval = setInterval(missileTravel, 250);
}

function missileTravel() {
  if (travelDistance > 1) {
    removeMissile();
    missilePosition = missilePosition - 20;
    addMissile();
    travelDistance--;
    // console.log(travelDistance);
  } else {
    endMissile();
    travelDistance = 19
  }
}

function endMissile() {
  clearInterval(interval);
  removeMissile();
}

//todo alien movement --- will add in multiple aliens when i get 1 going
// let leftToRight = true;

// function moveAlien() {
//   const x = alienPosition % width;
//   const y = Math.floor(alienPosition / width);
//   setInterval(() => {
//     if (x === 1 || x === 9) {
//       checkEdge();
//     }
//     if (LeftToRight == true) {
//       moveAlienRight();
//     } else {
//       moveAlienLeft();
//     }
//   }, 1000);
// }

// function moveAlienRight() {
//   const x = alienPosition % width;
//   if (x < 9) {
//     alienPosition++;
//     placeAlien(alienPosition);
//   } else {
//     moveAlienDown();
//   }
// }

// function moveAlienLeft() {
//   alienPosition--;
//   placeAlien(alienPosition);
// }
// function checkEdge() {
//   leftToRight ^= true;
//   moveAlienDown();
// }
// function moveAlienDown() {
//   alienPosition = alienPosition + 20;
//   placeAlien(alienPosition);
// }

// //   createGrid();
// //   window.addEventListener("keydown", movePlayer);
// //   window.addEventListener("keydown", playerShoot);
// // }
// // document.addEventListener("DOMContentLoaded", init);
