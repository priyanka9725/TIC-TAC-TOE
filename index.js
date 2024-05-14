let boxes = document.querySelectorAll(".box");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msgContainer");
let resetButton = document.querySelector("#reset-button");
let newGameButton = document.querySelector("#new-game-button");
let heading = document.querySelector(".head");
let turn0 = true;
let count = 0;

const winConditions = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      box.innerText = "O";
      turn0 = false;
    } else {
      box.innerText = "X";
      turn0 = true;
    }
    count++;
    box.disabled = true;

    let ifWinner = checkWinner();
    if (count == 9 && !ifWinner) gameDraw();
  });
});

const gameDraw = () => {
  msg.innerText = "Game is Draw";
  msgContainer.classList.remove("hide");
  disabledBoxes();
};

const enabledBoxes = () => {
  for (let b of boxes) {
    b.disabled = false;
    b.innerText = "";
    b.classList.remove("hide");
    resetButton.classList.remove("hide");
    heading.classList.remove("hide");
  }
};

const disabledBoxes = () => {
  for (let b of boxes) {
    b.disabled = true;
    b.classList.add("hide");
    resetButton.classList.add("hide");
    heading.classList.add("hide");
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disabledBoxes();
};

const checkWinner = () => {
  for (let condition of winConditions) {
    let pos1 = boxes[condition[0]].innerText;
    let pos2 = boxes[condition[1]].innerText;
    let pos3 = boxes[condition[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        showWinner(pos1);
        return true;
      }
    }
  }
};

const resetGame = () => {
  count = 0;
  turn0 = true;
  enabledBoxes();
  msgContainer.classList.add("hide");
};

newGameButton.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);
