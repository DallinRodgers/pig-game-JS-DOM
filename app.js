/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- If the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- If the player rolls 6 twice in a row they lose their score
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundscore, currentPlayer, gamePlaying, lastRoll;
init();

// document.querySelector("#current-" + currentPlayer).textContent = dice;

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    // Get Random Number
    var dice = Math.floor(Math.random() * 6) + 1;
    // Display Result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";
    // Update roundscore if the rolled number is NOT 1
    if (lastRoll === 6 && dice === 6) {
      scores[currentPlayer] = 0;
      document.querySelector("#score-" + currentPlayer).textContent = "0";
      nextPlayer();
    } else if (dice !== 1) {
      roundscore += dice;
      document.querySelector(
        "#current-" + currentPlayer
      ).textContent = roundscore;
    } else {
      nextPlayer();
    }
    lastRoll = dice;
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    scores[currentPlayer] += roundscore;
    document.querySelector("#score-" + currentPlayer).textContent =
      scores[currentPlayer];

    var input = document.querySelector(".final-score").value;
    var winningScore;
    // Undefined, 0, null or "" are coerced to false
    // Anything else is coered to true
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }
    if (scores[currentPlayer] >= winningScore) {
      // End Game
      document.querySelector("#name-" + currentPlayer).textContent = "WINNER!!";
      document
        .querySelector(".player-" + currentPlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + currentPlayer + "-panel")
        .classList.remove("active");
      document.querySelector(".dice").style.display = "none";
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundscore = 0;
  currentPlayer = 0;
  gamePlaying = true;

  document.querySelector(".dice").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

function nextPlayer() {
  roundscore = 0;
  lastRoll = 0;
  document.querySelector("#current-" + currentPlayer).textContent = 0;
  document.querySelector("#current-" + currentPlayer).textContent = roundscore;
  currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  document.querySelector(".dice").style.display = "none";
}
