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
let score = 0



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
  moveAlien()
}

function placePlayer(playerPosition) {
  cells[playerPosition].classList.add("player");
}

//todo make alien an array and this a forEach
function placeAlien(alienPosition) {
  cells[alienPosition].classList.add("alien");
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

function checkIfHit(){
  if (missilePosition.classList.contains("alien")){
    //  destroyAlien()
    endMissile()
    score ++
  }
}

function scoreUp(){
  score += 100
  scoreDisplay.innerHTML = score
}

//todo alien movement --- will add in multiple aliens when i get 1 going
//todo potentially making all of this an array, witch switch methods?
// let leftToRight = true;

function moveAlien() {
  setInterval(() => {
    moveAlienRight();
  }, 1000);
}

function moveAlienRight() {
  removeAlien(alienPosition);
  // console.log(alienPosition);
  alienPosition++;
  placeAlien(alienPosition);
}

function moveAlienLeft() {
  removeAlien(alienPosition);
  alienPosition--;
  placeAlien(alienPosition);
}
function checkEdge() {
  // leftToRight ^= true;
  moveAlienDown();
}
function moveAlienDown() {
  removeAlien(alienPosition);
  alienPosition = alienPosition + 20;
  placeAlien(alienPosition);
}
function removeAlien(alienPosition){
  cells[alienPosition].classList.remove("alien");
}