//The start of the journey
document.addEventListener("DOMContentLoaded", init); //page loads and does the init() function


// function init() {
const grid = document.querySelector(".grid");
const start = document.querySelector(".startBtn");
const graphics = document.querySelector(".graphicsBtn");
const sound = document.querySelector(".soundBtn");
const backgroundSound = document.querySelector(".backgroundSound")
// const pew = document.querySelector(".pewPew") currently causing 2 grids
const scoreDisplay = document.querySelector("#score-display");
const cells = [];
const width = 20;
const gridCellCount = width * width;

let toPlay = true;
let missilePosition;
let playerPosition = 389;
let interval;
let travelDistance = 19;
let score = 0
const alienPosition = [
  4, 6, 8, 10, 12, 14, 25, 27, 29, 31, 33, 35, 44, 46, 48, 50, 52, 54, 65, 67,
  69, 71, 73, 75
];


function init() {
  window.addEventListener("keydown", movePlayer);
  window.addEventListener("keydown", playerShoot);
  start.addEventListener("click", createGrid);
  sound.addEventListener("click", backgroundMusic);
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
  placeAlien();
  moveAlien()
}

function backgroundMusic(){
  if (toPlay){
    backgroundSound.src = "./sound/backGroundMusic.mp3"
    backgroundSound.play();
    console.log(toPlay)
    toPlay = false
  } else {
    backgroundSound.pause();
    toPlay = true
  }
}


function placePlayer(playerPosition) {
  cells[playerPosition].classList.add("player");
}

function placeAlien(){
  for (let i = 0; i < alienPosition.length; i++){
    cells[alienPosition[i]].classList.add("alien")
  }
}

//player controls
function movePlayer(event) {
  const x = playerPosition % width;
  const y = Math.floor(playerPosition / width);
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
    console.log(cells)
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
  interval = setInterval(missileTravel, 75); //was originally 250
}

function missileTravel() {
  if (travelDistance > 1) {
    // checkIfHit()
    removeMissile();
    missilePosition = missilePosition - 20;
    addMissile();
    travelDistance--;
  } else {
    endMissile();
  }
}
function endMissile() {
  clearInterval(interval);
  removeMissile();
  travelDistance = 19
}

// function checkIfHit(){
//   if (cells[missilePosition - 20].classList.contains("alien")){
//     for ( let i = 0; i < alienPosition.length; i++){ 
//       if ( alienPosition[i] === missilePosition - 20) { 
//         alienPosition.splice(i, 1); 
//         endMissile()
//         scoreUp()
//       }
//   }}
// }

function scoreUp(){
  score += 100
  scoreDisplay.innerHTML = score
}

//todo alien movement --- will add in multiple aliens when i get 1 going
//todo potentially making all of this an array, witch switch methods?
// let leftToRight = true;
const rightSide = [
  19, 39, 59, 79, 99, 119, 139, 159, 179, 199, 219, 239, 259, 279, 299, 319,
  339, 359, 379
];
const leftSide = [
  0, 20, 40, 60, 80, 90, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300,
  320, 340, 360
];

function moveAlien() {
  // const x = alienPosition % width;
  // const y = Math.floor(alienPosition / width);
  setInterval(() => {
    if (alienPosition.filter((position) => rightSide.includes(position))) {
      moveAlienDown();
    } else if (alienPosition.filter((position) => leftSide.includes(position))) {
      moveAlienDown();
    } else {
      moveAlienRight();
    }
  }, 1000);
}

//

//todo make alien an array and this a forEach
function moveAlienRight() {
  removeAlien(alienPosition);
  for (let i = 0; i < alienPosition.length; i++) {
    alienPosition[i] += 1 ;
  }
  placeAlien();
}

function moveAlienLeft() {
  removeAlien(alienPosition);
  for (let i = 0; i < alienPosition.length; i++) {
    alienPosition[i] -= 1 ;
  }
  placeAlien();
}
// function checkEdge() {
//   // leftToRight ^= true;
//   moveAlienDown();
// }
function moveAlienDown() {
  removeAlien(alienPosition);
  for (let i = 0; i < alienPosition.length; i++) {
    alienPosition[i] += 20;
  }
  placeAlien();
}
function removeAlien(){
  for (let i = 0; i < alienPosition.length; i++) {
    cells[alienPosition[i]].classList.remove("alien");
  }
}

//