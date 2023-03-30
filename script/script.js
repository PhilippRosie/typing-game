// Variables for the DOM elements
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const settingsBtn = document.getElementById("settings-btn");
const difficultySelect = document.getElementById("difficulty");

// Array
const words = [
  "dependent",
  "dog",
  "superficial",
  "admit",
  "juice",
  "javascript",
  "developer",
  "airplane",
  "great",
  "fun",
  "manipulate",
  "cat",
  "transition",
  "school",
  "computer",
  "programming",
  "drag",
  "loving",
  "north",
];

// PART 1
// 1. getRandomWord
// 2. addWordToDOM
// 3. add event listener to text element
// 4. updateScore

// PART 2
// 5. get the cursor automatically in input
// 6. Counting down - timer
// 7. update time
// 8. gameOver
// 9. eventlistener => time += 5;

// PART 3
// 10. settings btn
// 11. settings select
// 12. pull from local storage
// 13. set difficulty select value
// 14. set time depending on difficulty in the eventlistener

// Initilizing word
let randomWord;

// Initializing score
let score = 0;

// Initializing time
let time = 10;

// difficulty
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// set difficulty select
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// focus text input at start
text.focus();

//COUNTING DOWN
const timeInterval = setInterval(updateTime, 1000);

// RANDOM WORDS
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
  // floor will just round down
  // function to get a random word from our words array
}

// ADD WORD TO DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// UPDATE SCORE
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// UPDATE TIME
function updateTime() {
  time--;

  timeEl.innerHTML = time + "s";
  if (time === 0) {
    clearInterval(timeInterval);

    gameOver();
  }
}

// GAME OVER
function gameOver() {
  endgameEl.innerHTML = `<h1>Time ran out!</h1> <p> Your final score is ${score}</p> <button onClick="location.reload()">Reload</button>`;

  endgameEl.style.display = "flex";
}

addWordToDOM();

text.addEventListener("input", (event) => {
  const insertedText = event.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();

    updateScore();

    event.target.value = "";

    // Gives you five more seconds when you enter correct word
    //time += 5;

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

// SETTINGS BUTTON CLICK
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

// SETTINGS SELECT
settingsForm.addEventListener("change", (event) => {
  difficulty = event.target.value;

  localStorage.setItem("difficulty", difficulty);
});
