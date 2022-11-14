//The start of the journey
document.addEventListener("DOMContentLoaded", init); //page loads and does the init() function

// function init() {
const grid = document.querySelector(".grid");
const gridWrapper = document.querySelector(".grid-wrapper");
const body = document.querySelector("body");
const start = document.querySelector(".startBtn");
const graphics = document.querySelector(".graphicsBtn");
const sound = document.querySelector(".soundBtn");
const backgroundSound = document.querySelector(".backgroundSound");
const pew = document.querySelector(".pewPew");
const scoreDisplay = document.querySelector("#score-display");
const linkGit = document.querySelector(".git");
const heartCounter = document.querySelector(".hearts");
const title = document.querySelector(".header");
const pTag = document.querySelector(".pTag");
const pScore = document.querySelector(".pScore");
const lives = document.querySelector(".lives");
const highScoreDisplay = document.querySelector(".highScore");
const cells = [];
const width = 10;
const gridCellCount = width * width;

const alienPosition = [3, 4, 5, 6, 13, 14, 15, 16, 23, 24, 25, 26];

const respawning = [3, 4, 5, 6, 13, 14, 15, 16, 23, 24, 25, 26];

let updatedLook = 0;
let score = 0;
let toPlay = true;
let playerPosition = 95;
let goingRight = true;
let movement = 1;
let missileInterval;
let alienInterval;
let laserInterval;
let missilePosition;
let laserPosition;
let travelDistance = 9;
let lifeCount = 3;
let aliensCanShoot = true;

let gameScaling = 1000

function init() {
  window.addEventListener("keydown", movePlayer);
  window.addEventListener("keydown", playerShoot);
  start.addEventListener("click", createGrid);
  sound.addEventListener("click", backgroundMusic);
  graphics.addEventListener("click", graphicalUpdate);
}
//todo function startGame(){} playerplace, alienplace and move
function createGrid() {
  enableGameStats();
  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement("div");
    cell.setAttribute("data-index", i);
    cells.push(cell);
    grid.appendChild(cell);
  }
  placePlayer(playerPosition);
  placeAlien();
  alienInterval = setInterval(moveAlien, gameScaling);
}
function enableGameStats() {
  grid.classList.remove("gameOverScreen");
  lifeCount = 3;
  lives.textContent = lifeCount;
  start.disabled = true;
  aliensCanShoot = true;
}
function backgroundMusic() {
  if (toPlay) {
    backgroundSound.src = "./sound/backGroundMusic.mp3";
    backgroundSound.play();
    backgroundSound.loop;
    toPlay = false;
    pew.src = "./sound/pew-pew.mp3";
  } else {
    backgroundSound.pause();
    toPlay = true;
  }
}
function graphicalUpdate(event) {
  const enable = confirm(
    "Graphics?! In this economy?... Sure, if you slide me 5 bucks?"
  );
  if (enable) {
    updatedLook += 1;
    graphics.style.display = "none";
    grid.classList.add("divBackGrd");
    body.classList.add("graphicalBody");
    start.classList.add("redButton");
    linkGit.classList.add("linkGit");
    heartCounter.innerHTML = "";
    heartCounter.classList.add("heartsDisplay");
    title.classList.add("title");
    sound.classList.add("soundButton");
    pTag.innerHTML =
      "Careful Space Cadet! You are humanities last chance at survival! Hold them off as long as you can, while we evacuate the planet! The <span>more you kill </span>, <span>the quicker they come!</span> Use the arrow keys to move, space to shoot. I will reload your gun as fast as I can! God speed Cadet!";
    pTag.classList.add("pStyle");
    pScore.classList.add("pStyle");
    highScoreDisplay.classList.add("pStyle");
  }
}
function placePlayer(playerPosition) {
  if (updatedLook === 1){
    cells[playerPosition].classList.add("player");
  } else {
    cells[playerPosition].classList.add("blockShip");
  }
}
function placeAlien() {
  if (updatedLook === 1){
    for (let i = 0; i < alienPosition.length; i++) {
      cells[alienPosition[i]].classList.add("alien");
    }
  } else {
    for (let i = 0; i < alienPosition.length; i++) {
      cells[alienPosition[i]].classList.add("invader");
    }
  }
}
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
  cells[cellNumber].classList.remove("blockShip");
  if (updatedLook === 1){
    cells[cellNumber].classList.remove("player");
  } 
}

//ToDo rough beginning shoot - need to put the stopper on spam shoot
function playerShoot(event) {
  if (event.keyCode === 32) {
    event.preventDefault();
    if (travelDistance === 9) {
      missilePosition = playerPosition - 10;
      smokePoof(missilePosition);
      startMissile();
      pew.play();
    }
  }
}
function smokePoof(missilePosition) {
  if (updatedLook === 1){
    cells[missilePosition].classList.add("smoke");
    setTimeout(() => {
      cells[missilePosition].classList.remove("smoke");
    }, 250);
  } else {
    cells[missilePosition].classList.add("greyMist");
    setTimeout(() => {
      cells[missilePosition].classList.remove("greyMist");
    }, 250);
  }
}
function removeMissile(cellNumber) {
  cells[missilePosition].classList.remove("rocket");
  if (updatedLook === 1){
    cells[missilePosition].classList.remove("missile");
  }
}
function addMissile(cellNumber) {
  if (updatedLook === 1){
    cells[missilePosition].classList.add("missile");
  } else {
    cells[missilePosition].classList.add("rocket");
  }
}
function startMissile() {
  missileInterval = setInterval(missileTravel, 75);
}
function missileTravel() {
  if (travelDistance > 1) {
    removeMissile();
    missilePosition = missilePosition - 10;
    addMissile();
    travelDistance--;
    checkIfHit();
  } else {
    removeMissile();
    checkIfHit();
    endMissile();
  }
}
function endMissile() {
  travelDistance = 9;
  clearInterval(missileInterval);
  removeMissile();
}
function checkIfHit() {
  if (updatedLook === 1){
    if (cells[missilePosition].classList.contains("alien")) {
      scoreUp();
      for (let i = 0; i < alienPosition.length; i++) {
        if (alienPosition[i] === missilePosition) {
          cells[alienPosition[i]].classList.remove("alien");
          alienPosition.splice(i, 1);
          checkRespawn();
        }
      }
      endMissile();
    }
  }
  if (cells[missilePosition].classList.contains("invader")) {
    scoreUp();
    for (let i = 0; i < alienPosition.length; i++) {
      if (alienPosition[i] === missilePosition) {
        cells[alienPosition[i]].classList.remove("invader");
        alienPosition.splice(i, 1);
        checkRespawn();
      }
    }
    endMissile();
  }
}
//todo add a boss? gamescaling > 200 spawn boss, then end game?
function checkRespawn() {
  if (alienPosition.length === 0) {
    gameScaling = gameScaling - 100
    clearInterval(alienInterval);
    respawning.forEach((spawn) => alienPosition.push(spawn));
    placeAlien();
    alienInterval = setInterval(moveAlien, gameScaling);
  }
}
function scoreUp() {
  score += 100;
  scoreDisplay.innerHTML = score;
}
//todo re-write moveAlien to something nicer to look at
function moveAlien() {
  const leftSide = alienPosition[0] % width === 0;
  const rightSide =
    alienPosition[alienPosition.length - 1] % width === width - 1;
  removeAlien();
  checkDefeat();
  if (goingRight && rightSide) {
    for (let i = 0; i < alienPosition.length; i++) {
      alienPosition[i] += width + 1;
      movement = -1;
      goingRight = false;
    }
  }
  if (leftSide && !goingRight) {
    for (let i = 0; i < alienPosition.length; i++) {
      alienPosition[i] += width - 1;
      movement = 1;
      goingRight = true;
    }
  }
  for (let i = 0; i < alienPosition.length; i++) {
    alienPosition[i] += movement;
  }
  placeAlien();
  alienShoots();
}
function removeAlien() {
  for (let i = 0; i < alienPosition.length; i++) {
    cells[alienPosition[i]].classList.remove("invader");
  }
  if (updatedLook === 1){
    for (let i = 0; i < alienPosition.length; i++) {
      cells[alienPosition[i]].classList.remove("alien");
    }
  }
}
function checkDefeat() {
  const finishLine = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99];
  if (alienPosition.some((value) => finishLine.includes(value))) {
    endGame();
  }
}
function alienShoots() {
  if (aliensCanShoot) {
    laserPosition =
      alienPosition[Math.floor(Math.random() * alienPosition.length)];
    startLaser();
    pew.play();
    aliensCanShoot = false;
  }
}
function startLaser() {
  laserInterval = setInterval(laserTravel, 250);
}
function addLaser() {
  if (updatedLook === 1){
    cells[laserPosition].classList.add("laser");
  } else {
    cells[laserPosition].classList.add("blockLaser");
  }
}
function removeLaser(cellNumber) {
  cells[laserPosition].classList.remove("blockLaser");
  if (updatedLook === 1){
    cells[laserPosition].classList.remove("laser");
  }
}
function laserTravel() {
  if (laserPosition < 90) {
    removeLaser();
    laserPosition = laserPosition + 10;
    addLaser();

    checkForPlayer();
  } else {
    aliensCanShoot = true;
    removeLaser();
    checkForPlayer();
    endLaser();
  }
}
function checkForPlayer() {
  if (updatedLook === 1){
    if (cells[laserPosition].classList.contains("player")) {
      playerGetsShot();
      removeLaser();
      endLaser();
      aliensCanShoot = true;
    }
  } else {
    if (cells[laserPosition].classList.contains("blockShip")) {
      playerGetsShot();
      removeLaser();
      endLaser();
      aliensCanShoot = true;
    }
  }
}
function endLaser() {
  removeLaser();
  clearInterval(laserInterval);
}
function playerGetsShot() {
  if (lifeCount === 3) {
    if (updatedLook === 1) {
      heartCounter.style.backgroundImage = "url(../images/2heart.png)";
      lifeCount = 2;
    } else {
      lifeCount = 2;
      lives.textContent = lifeCount;
    }
  } else if (lifeCount === 2) {
    if (updatedLook === 1) {
      heartCounter.style.backgroundImage = "url(../images/lastHeart.png)";
      lifeCount = 1;
    } else {
      lifeCount = 1;
      lives.textContent = lifeCount;
    }
  } else {
    lifeCount = 0;
    lives.textContent = lifeCount;
    endGame();
  }
}
function endGame() {
  grid.classList.add("gameOverScreen");
  displayScores();
  resetStats();
  alienPosition.splice(0, alienPosition.length);
  respawning.forEach((spawn) => alienPosition.push(spawn));
}
function storeScore() {
  const playerName = prompt("Whats your name Space Cadet?");
  const newScore = { score, playerName };
  const scores = localStorage.getItem("highscores");
  console.log(scores);
  if (scores === null) {
    console.log("highscores is null");
    localStorage.setItem("highscores", JSON.stringify([newScore]));
  } else {
    const scoresFromStorage = JSON.parse(scores);
    scoresFromStorage.push(newScore);
    localStorage.setItem("highscores", JSON.stringify(scoresFromStorage));
  }
}
function displayScores() {
  setTimeout(() => {
    alert(`You did your best Cadet! We managed to evacuate ${score} people`);
    storeScore();
    const highScores = localStorage.getItem("highscores"); // this returns a string
    const highScoresAsObject = JSON.parse(highScores); // transform it into an array
    start.disabled = false;
    const sorted = highScoresAsObject.sort((a, b) => b.score - a.score);
    const highScoreElements = sorted.map(
      (player) => `<li>${player.playerName}: ${player.score}</li>`
    );
    highScoreDisplay.innerHTML = `<ul>${highScoreElements.join("")}</ul>`;
    scoreDisplay.innerHTML = score;
    score = 0;
  }, 1000);
}
function resetStats() {
  aliensCanShoot = false;
  heartCounter.style.backgroundImage = "";
  clearInterval(missileInterval);
  clearInterval(alienInterval);
  removeAlien(alienPosition);
  removePlayer(playerPosition);
}