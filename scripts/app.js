//The start of the journey
document.addEventListener("DOMContentLoaded", init); //page loads and does the init() function


// function init() {
const grid = document.querySelector(".grid");
const body = document.querySelector("body")
const start = document.querySelector(".startBtn");
const graphics = document.querySelector(".graphicsBtn");
const sound = document.querySelector(".soundBtn");
const backgroundSound = document.querySelector(".backgroundSound")
const pew = document.querySelector(".pewPew")
const scoreDisplay = document.querySelector("#score-display");
const linkGit = document.querySelector(".git")
const heartCounter = document.querySelector(".hearts")
const title = document.querySelector("h1")
const pTag = document.querySelector(".pTag")
const pScore = document.querySelector(".pScore")
const lives = document.querySelector(".lives")
const cells = [];
const width = 20;
const gridCellCount = width * width;

const alienPosition = [
  4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 24, 25, 26, 27, 28, 29, 30, 31, 32,
  33, 34, 35, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 64, 65, 66, 67,
  68, 69, 70, 71, 72, 73, 74, 75
];

const respawning = [
  4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 64, 65, 66, 67,
  68, 69, 70, 71, 72, 73, 74, 75
];

let updatedLook = 0
let score = 0
let toPlay = true;
let playerPosition = 389;
let goingRight = true;
let movement = 1;
let interval;
let secondInterval
let missilePosition;
let travelDistance = 19;
let lifeCount = 3


function init() {
  window.addEventListener("keydown", movePlayer);
  window.addEventListener("keydown", playerShoot);
  start.addEventListener("click", createGrid);
  sound.addEventListener("click", backgroundMusic);
  graphics.addEventListener("click", graphicalUpdate)
}

//todo function startGame(){} playerplace, alienplace and move
function createGrid() {
  start.disabled = true;
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement("div");
    cell.setAttribute("data-index", i);
    cells.push(cell);
    grid.appendChild(cell);
  }
  placePlayer(playerPosition);
  placeAlien();
  secondInterval = setInterval(moveAlien, 500);
}
function backgroundMusic(){
  if (toPlay){
    backgroundSound.src = "./sound/backGroundMusic.mp3"
    backgroundSound.play();
    backgroundSound.loop;
    toPlay = false
    pew.src = "./sound/pew-pew.mp3"
  } else {
    backgroundSound.pause();
    toPlay = true
  }
}
//todo window prompt joke nad styling with classes
function graphicalUpdate(event){
  updatedLook += 1;
  graphics.style.display = "none"
  grid.classList.add("divBackGrd");
  body.classList.add("graphicalBody");
  start.classList.add("redButton")
  linkGit.classList.add("linkGit");
  heartCounter.innerHTML = ""
  heartCounter.classList.add("heartsDisplay")
  title.textContent = "Defender!"
  title.classList.add("title")
  sound.classList.add("soundButton");
  pTag.textContent = "Careful Space Cadet! You are humanities last chance at survival! Hold them off as long as you can, while we evacuate the planet! Use the arrow keys to move, space to shoot. I will reload your gun as fast as I can! God speed Cadet!"
  pTag.classList.add("pStyle")
  pScore.classList.add("pStyle")
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
// keeping ability to shoot tied to travel distant, now i just need to do it
// so travel distance is reset more

function playerShoot(event) {
  if (event.keyCode === 32) {
    event.preventDefault();
    if (travelDistance === 19){
      missilePosition = playerPosition - 20;
      smokePoof(missilePosition);
      startMissile();
      pew.play()
    }
  }
}
function smokePoof(missilePosition) {
  cells[missilePosition].classList.add("smoke");
  setTimeout(() => {
    cells[missilePosition].classList.remove("smoke");
  }, 250);
}
function removeMissile(cellNumber) {
  cells[missilePosition].classList.remove("missile");
}
function addMissile(cellNumber) {
  cells[missilePosition].classList.add("missile");
}
function startMissile() {
  interval = setInterval(missileTravel, 25); 
}
function missileTravel() {
  if (travelDistance > 1) {
    removeMissile();
    missilePosition = missilePosition - 20;
    addMissile();
    travelDistance--;
    checkIfHit()
  } else {
    removeMissile()
    checkIfHit()
    endMissile();
  }
}
function endMissile() {
  travelDistance = 19;
  console.log(travelDistance)
  clearInterval(interval);
  removeMissile()
}
function checkIfHit(){
  if (cells[missilePosition].classList.contains("alien")){
    scoreUp();
    for ( let i = 0; i < alienPosition.length; i++){ 
      if ( alienPosition[i] === missilePosition) { 
        cells[alienPosition[i]].classList.remove("alien");
        alienPosition.splice(i, 1);
        checkRespawn()
      }
    }
    endMissile();
  }
}
function checkRespawn(){
  if (alienPosition.length === 0){
    clearInterval(secondInterval);
    respawning.forEach((spawn)=> alienPosition.push(spawn))
    placeAlien()
    secondInterval = setInterval(moveAlien, 500);
  }
}
function scoreUp(){
  score += 100
  scoreDisplay.innerHTML = score
}
//todo re-write moveAlien to something nicer to look at
function moveAlien() {
  const leftSide = alienPosition[0] % width === 0
  const rightSide = alienPosition[alienPosition.length - 1] % width === width - 1;
  removeAlien()
  checkDefeat()
  if (goingRight && rightSide){
    for (let i = 0; i < alienPosition.length; i++) {
      alienPosition[i] += width + 1
      movement = -1
      goingRight = false
    }
  }
  if (leftSide && !goingRight){
    for (let i = 0; i < alienPosition.length; i++) {
      alienPosition[i] += width - 1
      movement = 1
      goingRight = true
    }
  }
  for (let i = 0; i < alienPosition.length; i++) {
    alienPosition[i] += movement
  }
  placeAlien()
}
function removeAlien(){
  for (let i = 0; i < alienPosition.length; i++) {
    cells[alienPosition[i]].classList.remove("alien");
  }
}
function checkDefeat(){
  const finishLine = [380, 381, 382, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399]
  if (alienPosition.some(value => finishLine.includes(value))){
    endGame()
  }
}

function alienShoots(){
  console.log("add everything here")
}
function playerGetsShot(){
  if (lifeCount === 3){
    lifeCount = 2;
    lives.textContent = lifeCount
    heartCounter.style.backgroundImage = "url(../images/2heart.png)";
  } else if (lifeCount === 2){
    lifeCount = 1;
    heartCounter.style.backgroundImage = "url(../images/lastHeart.png)";
  } else if (lifeCount === 1 ){
    lifeCount = 1
    heartCounter.style.backgroundImage = "url(../images/lastHeart.png)";
  } else {
    endGame()
  }
}

function endGame() {
  removeAlien();
  lifeCount = 3
  alert(`You did your best cadet! We managed to evacuate ${score} people`);
  clearInterval(secondInterval);
  start.disabled = false;
}