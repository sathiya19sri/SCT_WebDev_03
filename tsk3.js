const board = document.getElementById("board");
const cells = Array.from(document.querySelectorAll(".cell"));
const resetBtn = document.getElementById("resetBtn");

let gameState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

function handleClick(event) {
  const cell = event.target;
  const index = cell.getAttribute("data-index");

  if (gameState[index] !== "" || !isGameActive) return;

  gameState[index] = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());
  cell.textContent = currentPlayer;

  if (checkWin()) {
    setTimeout(() => alert(`${currentPlayer} wins!`), 100);
    isGameActive = false;
    return;
  }

  if (gameState.every(cell => cell !== "")) {
    setTimeout(() => alert("It's a tie!"), 100);
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";

  // Uncomment below to play against a computer opponent
  // if (currentPlayer === "O") computerPlay();
}

function checkWin() {
  return winningConditions.some(condition => {
    return condition.every(index => gameState[index] === currentPlayer);
  });
}

function computerPlay() {
  const emptyCells = gameState.map((value, index) => value === "" ? index : null).filter(v => v !== null);

  if (emptyCells.length > 0 && isGameActive) {
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    gameState[randomIndex] = "O";
    cells[randomIndex].classList.add("o");
    cells[randomIndex].textContent = "O";

    if (checkWin()) {
      setTimeout(() => alert("O wins!"), 100);
      isGameActive = false;
      return;
    }

    if (gameState.every(cell => cell !== "")) {
      setTimeout(() => alert("It's a tie!"), 100);
      isGameActive = false;
      return;
    }

    currentPlayer = "X";
  }
}

function resetGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  currentPlayer = "X";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
  });
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
resetBtn.addEventListener("click", resetGame);
