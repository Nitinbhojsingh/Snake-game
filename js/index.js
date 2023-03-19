// GAME CONSTANTS & VARIABLES
const hiscoreBox = document.getElementById("hiscoreBox");
const scoreBox = document.getElementById("scoreBox");
const gameOver = document.querySelector(".game-over");

let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let hiscoreval = 0;
let food = { x: 6, y: 7 };

// GAME FUNCTIONS
const main = (cTime) => {
  window.requestAnimationFrame(main);
  if ((cTime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = cTime;
  gameEngine();
};

const addHidden = () => {
  gameOver.classList.remove("hidden");
};

const isCollide = (snake) => {
  // If snake bump into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  document.addEventListener("keydown", (e) => {
    if ((e.key === "Escape", "Backspace" && gameOver.classList.add("hidden"))) {
      addHidden();
    }
  });

  // if snake bump into the wall
  if (
    snake[0].x >= 28 ||
    snake[0].x <= 0 ||
    snake[0].y >= 28 ||
    snake[0].y <= 0
  ) {
    return true;
  }
  return false;
};

const gameEngine = () => {
  // Part 1: Updating the snake array & food
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    inputDir = { x: 0, y: 0 };
    // closeHidden();
    gameOver.classList.remove("hidden");
    //
    // alert("Game Over, Press any key to play again");
    snakeArr = [{ x: 13, y: 15 }];
    score = 0;
    speed = 5;
    scoreBox.innerHTML = `Score: ${score}`;
    document.getElementById("final-score").innerHTML = finalScore;
    document.getElementById("popup").style.display = "flex";
  }

  // If you have eaten the food, increment the score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    speed += 0.1;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = `HiScore: ${hiscoreval}`;
    }
    scoreBox.innerHTML = `Score: ${score}`;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    const a = 2;
    const b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Part 2: Display the snake and food
  // Display the food
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  // Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
};

// MAIN LOGIC STARTS HERE
localStorage.setItem("hiscore", JSON.stringify(0));
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML = "HiScore: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; // Start the game
  moveSound.play();

  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    default:
      break;
  }
});
