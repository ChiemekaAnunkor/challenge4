let gameMode = document.querySelector(".gamemode");
let scoreForm = document.querySelector(".form");
let playerScore = document.querySelector(".playerscore");
let highScore = document.querySelector(".highscore");
let homePage = document.querySelector(".homepage");
const renderScore = document.querySelector(".lscore");

//db
const quizQuestion = [
  [
    "1what is the name of use",
    "alabama",
    "kentuky",
    "frankfort",
    "fort",
    "fort",
  ],
  [
    "2whos isdfdf the name of use",
    "alabama",
    "kentuky",
    "frankfort",
    "pork",
    "pork",
  ],
  ["3where is the name of use", "alabama", "kentuky", "stone", "fort", "stone"],
  [
    "4what is the name of use",
    "alabama",
    "kentuky",
    "frankfort",
    "mort",
    "mort",
  ],
  [
    "5whos is the name of use",
    "alabama",
    "kentuky",
    "frankfort",
    "oort",
    "oort",
  ],
  [
    "6where is the name of use",
    "alabama",
    "kentuky",
    "frankfort",
    "cort",
    "cort",
  ],
  [
    "7what is the name of use",
    "alabama",
    "kentuky",
    "frankfort",
    "dort",
    "dort",
  ],
  [
    "8whos is the name of use",
    "alabama",
    "kentuky",
    "frankfort",
    "zort",
    "zort",
  ],
  [
    "9where is the name of use",
    "alabama",
    "kentuky",
    "frankfort",
    "nort",
    "nort",
  ],
  [
    "10where is the name of use",
    "alabama",
    "kentuky",
    "frankfort",
    "lort",
    "lort",
  ],
];
//create the homepage

function loadHomePage() {
  homePage.style.display = "block";
}
loadHomePage();
function removeHomePage() {
  homePage.style.display = "none";
}

//display items on the list
let validateClick;

let currentQ;
let timeLeft = 2;
let count = 0;

function displayItems() {
  //random number genertor
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
  let generatedNum = getRandomInt(0, 10);
  for (var i = 0; i < quizQuestion.length; i++) {
    let inner = quizQuestion[i];
    if (i === generatedNum) {
      currentQ = quizQuestion[i];
    }
    // for (let i = 0; i < inner.length; i++) {
    //   console.log(inner[i]);
    // }
  }

  //display questions with answers
  gameMode.children[0].textContent = count + " points";
  gameMode.children[1].textContent = timeLeft + " seconds remaining";

  gameMode.children[2].textContent = currentQ[0];
  gameMode.children[3].textContent = currentQ[1];
  gameMode.children[4].textContent = currentQ[2];
  gameMode.children[5].textContent = currentQ[3];
  gameMode.children[6].textContent = currentQ[4];

  validateClick = currentQ[5];
  countdown();

  document.addEventListener("click", reloadQuestion);
}
function reloadQuestion(e) {
  let disabledButton = gameMode.querySelectorAll("#none");
  if (e.target.textContent === validateClick) {
    console.log("you won");
    timeLeft += 5;
    count += 10;
    let funcs = displayItems;
    e.target.style.backgroundColor = "green";
    setTimeout(() => {
      e.target.style.backgroundColor = "";
    }, "700");
    setTimeout(funcs, 1000);
    console.log(count);
  } else if (e.target.className === "select") {
    e.target.style.backgroundColor = "red";
    disabledButton[0].setAttribute("id", "disablemouse");
    disabledButton[1].setAttribute("id", "disablemouse");
    disabledButton[2].setAttribute("id", "disablemouse");
    disabledButton[3].setAttribute("id", "disablemouse");

    setTimeout(() => {
      e.target.style.backgroundColor = "";
      disabledButton[0].setAttribute("id", "none");
      disabledButton[1].setAttribute("id", "none");
      disabledButton[2].setAttribute("id", "none");
      disabledButton[3].setAttribute("id", "none");
    }, "1200");
  }
}

// Remove all elements when start button is pressed
let StartGameButton = document.querySelector(".startbutton");

StartGameButton.addEventListener("click", function () {
  removeHomePage();
  let arr = document.querySelectorAll(".select");
  for (let i = 0; i < arr.length; i++) {
    arr[i].style.display = "block";
  }

  displayItems();
});

///remove all elements when the game ends and timer is at zero
function removeGameMode() {
  console.log((gameMode.children[1].textContent = ""));
  let arr = document.querySelectorAll(".select");
  for (let i = 0; i < arr.length; i++) {
    arr[i].style.display = "none";
  }
}
//show form page
function displaySubmitForm() {
  scoreForm.style.display = "block";
  playerScore.textContent = count;
}
//hide form elements
function removeSubmitForm() {
  scoreForm.style.display = "none";
}

//show highscore page
function displayHighscorePage() {
  highScore.style.display = "block";
}
function removeHighscorePage() {
  highScore.style.display = "none";
  loadHomePage();
}
//retrieve score from the previous player

const showName = document.querySelector(".showname");
const showScore = document.querySelector(".showscore");
function GetPlayerScore() {
  var playerName = localStorage.getItem("name");
  var playerScore = localStorage.getItem("playscore");
  if (!playerName || !playerScore) {
    return;
  }

  showName.textContent = playerName;
  showScore.textContent = playerScore;
}

// Timer that counts down from 5
function countdown() {
  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      gameMode.children[1].textContent = timeLeft + " seconds remaining";
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else if (timeLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      gameMode.children[1].textContent = timeLeft + " second remaining";
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      gameMode.children[1].textContent = "";
      gameMode.children[0].textContent = "";
      gameMode.children[2].textContent = "";

      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      removeGameMode();
      displaySubmitForm();

      // Call the `displayMessage()` function
    }
  }, 1000);
}

const formSubmit = document.getElementById("formSubmit");
function handleFormSubmit(e) {
  e.preventDefault();
  let enteredName = document.getElementById("name").value;
  let enteredScore = count;
  localStorage.setItem("name", enteredName);
  localStorage.setItem("playscore", enteredScore);
  console.log(enteredScore);
  removeSubmitForm();

  displayHighscorePage();
  GetPlayerScore();
}

formSubmit.addEventListener("click", handleFormSubmit);

//reloved start page
const goHome = document.querySelector(".gohome");
const clearScore = document.querySelector(".clearscore");

goHome.addEventListener("click", removeHighscorePage);

function clearHighScore() {
  localStorage.setItem("name", " ");
  localStorage.setItem("playscore", " ");

  showName.textContent = " ";
  showScore.textContent = "";
}
clearScore.addEventListener("click", clearHighScore);

function loadScorePage() {
  removeHomePage();
  displayHighscorePage();
  GetPlayerScore();
}
// load the score page from homepage
renderScore.addEventListener("click", loadScorePage);
