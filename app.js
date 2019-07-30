/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundscore, currentPlayer;

scores = [0, 0];
roundscore = 0;
currentPlayer = 0;

document.querySelector(".dice").style.display = "none";

document.getElementById("score-0").textContent = "0";
document.getElementById("score-1").textContent = "0";
document.getElementById("current-0").textContent = "0";
document.getElementById("current-1").textContent = "0";

// document.querySelector("#current-" + currentPlayer).textContent = dice;

document.querySelector(".btn-roll").addEventListener("click", function() {
  // Get Random Number
  var dice = Math.floor(Math.random() * 6) + 1;
  // Display Result
  var diceDOM = document.querySelector(".dice");
  diceDOM.style.display = "block";
  diceDOM.src = "dice-" + dice + ".png";
  // Update roundscore if the rolled number is NOT 1
  if (dice !== 1) {
    roundscore += dice;
    document.querySelector(
      "#current-" + currentPlayer
    ).textContent = roundscore;
  } else {
    roundscore = 0;
    document.querySelector(
      "#current-" + currentPlayer
    ).textContent = roundscore;

    nextPlayer();
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  scores[currentPlayer] += roundscore;
  roundscore = 0;
  document.querySelector("#current-" + currentPlayer).textContent = 0;

  document.querySelector("#score-" + currentPlayer).textContent =
    scores[currentPlayer];
  nextPlayer();
});

function nextPlayer() {
  currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  document.querySelector(".dice").style.display = "none";
}
