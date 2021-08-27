const titleText = document.querySelector("#title");
const totalDiv = document.querySelector("#total-text");
const totalNumber = document.querySelector("#total");
const buttons = document.querySelectorAll("button");
const resetBtn = document.querySelector("input");

let num = Math.floor(Math.random() * 100) + 15;
let clicks = 10;
let currTotal = 0;

titleText.innerText = `In ${clicks} clicks get to ${num}`;

function makeRandColour() {
  const r = Math.floor(Math.random() * Math.floor(255));
  const g = Math.floor(Math.random() * Math.floor(255));
  const b = Math.floor(Math.random() * Math.floor(255));
  return `rgb(${r}, ${g}, ${b})`;
}

function colorise() {
  this.style.backgroundColor = makeRandColour;
}

function takeClicks() {
  if (clicks > 0) {
    this.style.backgroundColor = makeRandColour();
    this.style.outlineColor = makeRandColour();
    this.innerText = Math.floor(Math.random() * (50)) + 1;
    clicks--;
  }
}

function updateScore() {
  if (clicks > 0) {
    currTotal = 0;
    totalDiv.style.opacity = "1";
    for (let text of buttons) {
      if (text.innerText != "Click") {
        currTotal += parseInt(text.innerText);
      }
    }
    titleText.innerText = `In ${clicks} clicks get to ${num}`;
    totalNumber.innerText = currTotal;
    if (currTotal == num) {
      gameOver();
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  for (let button of buttons) {
    button.removeEventListener("mousedown", takeClicks);
    button.removeEventListener("mouseup", updateScore);
  }
  if (currTotal != num) {
    titleText.innerText = "Game Over";
    totalNumber.innerText = `You were ${Math.abs(num - currTotal)} away from ${num}`;
  } else {
    titleText.innerText = "You won!";
    totalNumber.innerText = `You got to ${num} in ${10 - clicks} click${(clicks == 1) ? 's' : ''}`;
  }
}

function reset() {
  num = Math.floor(Math.random() * 100) + 15;
  clicks = 10;
  currTotal = 0;
  titleText.innerText = `In ${clicks} clicks get to ${num}`;
  totalNumber.innerText = currTotal;
  addListeners();
  for (let button of buttons) {
    button.style.backgroundColor = "";
    button.innerText = "Click";
  }
}

function addListeners() {
  for (let button of buttons) {
    button.addEventListener("mousedown", takeClicks);
    button.addEventListener("mouseup", updateScore);
  }
}

resetBtn.addEventListener("click", function (e) {
  e.preventDefault();
  reset();
});

addListeners();
