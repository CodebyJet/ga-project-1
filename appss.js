function storeScore() {
  const playerName = prompt("Whats your name Space Cadet?");
  const newScore = { score, playerName };
  const scores = localStorage.getItem("highscores");
  if (scores === null) {
    console.log("highscores is null");
    localStorage.setItem("highscores", JSON.stringify([newScore]));
  } else {
    const scoresFromStorage = JSON.parse(scores);
    scoresFromStorage.push(newScore);
    localStorage.setItem("highscores", JSON.stringify(scoresFromStorage));
  }
}


const highScoreElements = sorted.map(
  (player) => `<li>${player.playerName}: ${player.score}</li>`
);
highScoreDisplay.innerHTML = `<ul>${highScoreElements.join("")}</ul>`;

