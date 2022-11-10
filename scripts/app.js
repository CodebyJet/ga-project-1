//The start of the journey

function init() {
  const grid = document.querySelector(".grid");
  const start = document.querySelector(".startBtn");
  const graphics = document.querySelector(".graphicsBtn")
  const sound = document.querySelector("soundBtn")
  const scoreDisplay = document.querySelector("#score-display");
  const cells = [];
  let missile;
  let playerPosition = 389
  let alienPosition = 9

  
  
  const width = 20;
  const gridCellCount = width * width;



  function createGrid() {
    for (let i = 0; i < gridCellCount; i++) {
      const cell = document.createElement("div");
      cell.setAttribute("data-index", i);
      cells.push(cell);
      grid.appendChild(cell);
    }
    placePlayer(playerPosition)
    placeAlien(alienPosition)
    // moveAlien()
  }

  function placePlayer(cellNumber){
    cells[cellNumber].classList.add("player")
  }
  function placeAlien(cellNumber){
    cells[cellNumber].classList.add("alien")
  }

  function movePlayer(event){
    const x = playerPosition % width;
    const y = Math.floor(playerPosition / width);
    console.log(x, y) 
    if (event.key === "ArrowRight" && x < width - 1) { 
      moveRight();
    } else if ( 
      event.key === "ArrowLeft" && x > 0) {
      moveLeft()
    } else if (event.keyCode === 32){
      playerShoot()
    }
  }

  //player controls
  function moveRight(){
    removePlayer(playerPosition);
    playerPosition ++;
    placePlayer(playerPosition)
  }
  function moveLeft() {
    removePlayer(playerPosition);
    playerPosition--;
    placePlayer(playerPosition);
  }
  function removePlayer(cellNumber){
    cells[cellNumber].classList.remove("player");
  }

  //ToDo rough beginning shoot
  // let ableToShoot = true
  let travelDistance = 19

  function playerShoot(cellNumber) {
    // if (ableToShoot){
    missile = playerPosition - 20;
    cells[missile].classList.add("missile");
    missileTravel()
    // }
  }
  function removeMissile(cellNumber){
    cells[missile].classList.remove("missile");
  }
  function addMissile(cellNumber){
    cells[missile].classList.add("missile");
  }

let timer

  function missileTravel(){
    timer = setInterval(() => {
      if (travelDistance > 0){
        removeMissile();
        missile = missile - 20;
        addMissile();
        travelDistance --
        console.log(travelDistance)
      } else {
        endMissile()
      }
    }, 250);
  }
  
  function endMissile(){
    clearInterval(timer)
    removeMissile()
  }




  //todo alien movement --- will add in multiple aliens when i get 1 going
  let leftToRight = true

  function moveAlien(){
    const x = alienPosition % width;
    const y = Math.floor(alienPosition / width);
    setInterval(() => {
      if (x == 1 || x == 9){
        checkEdge()
      }
      if (LeftToRight == true){
        moveAlienRight()
      } else {
        moveAlienLeft()
      }
    }, 1000);
  }

  function moveAlienRight(){
    const x = alienPosition % width;
    if ( x < 9){
      alienPosition++;
      placeAlien(alienPosition);
    } else {
      moveAlienDown()
    }
  }
  
  function moveAlienLeft() {
    alienPosition--;
    placeAlien(alienPosition);
  }
  function checkEdge(){
    leftToRight ^= true
    moveAlienDown()
  }
  function moveAlienDown() {
    alienPosition = alienPosition + 20;
    placeAlien(alienPosition);
  }
  


  createGrid();
  window.addEventListener("keydown", movePlayer);


}

document.addEventListener("DOMContentLoaded", init);
