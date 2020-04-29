let sequence = [];
let cont = 0;
let ingame = false;

const map = {
  0: "green",
  1: "red",
  2: "yellow",
  3: "blue",
};

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

$("body").keydown(function () {
  if (ingame !== true) {
    startGame();
  }
});

$(".btn").click(function () {
  aswer = Number(getKeyByValue(map, $(this).attr("id")));
  checkAnswer(aswer);
});

function startGame() {
  ingame = true;
  sortNextPlay();
}

function looser() {
  ingame = false;
  sequence = [];
  $("#level-title").text("Game over. Press any key to restart.");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 300);
}

function sortNextPlay() {
  randomValue = Math.floor(Math.random() * 4);
  sequence.push(randomValue);
  highlightBtn(map[randomValue]);
  playSong(randomValue);
  $("#level-title").text(`Level ${sequence.length}`);
}

function playSong(btn) {
  var audio = new Audio("sounds/" + map[btn] + ".mp3");
  audio.play();
}

function playWrong() {
  var audio = new Audio(`sounds/wrong.mp3`);
  audio.play();
}

function checkAnswer(aswer) {
  if (aswer == sequence[cont]) {
    if (cont === sequence.length - 1) {
      cont = 0;
      setTimeout(sortNextPlay, 1000);
    } else {
      cont++;
    }
    playSong(aswer);
  } else {
    cont = 0;
    playWrong();
    looser();
  }
}

function highlightBtn(btn) {
  $(`#${btn}`).addClass("pressed");
  setTimeout(function () {
    $(`#${btn}`).removeClass("pressed");
  }, 100);
}
