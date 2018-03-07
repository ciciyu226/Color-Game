/* user story:
1. when user clicks hard button, the six squares change to random picked colors.
  Meanwhile, the program picks one of the six colors as question and display its
  rgb value on the title.


  <span id="new-color">New Colors</span>
  <button id="">Play again? </button>
*/
//javascript variables
var colors = [];  //the color array containing the square colors.
var numSquares = 6; //default is 6 for hard mode.
var maxSquares = 6;  //maximum possible squares the game have.
var rowSquares = 3;   // number of squares in a row.
var NUM_EASY_MODE = 3;   //number of squares in easy mode.
var NUM_HARD_MODE = 6;    //number of squares in hard mode.
var pickedColor;
var hardMode = true; //boolean var to keep track of current mode.
var isCorrect = false;
//HTML DOM variables
var squares = document.querySelectorAll("#square"); //list of dom elements that has id=square.
var pickedColorHTML = document.querySelector("#pickedColor");
var hardBtn = document.querySelector("#hard-btn");
var easyBtn = document.querySelector("#easy-btn");
var message = document.querySelector("#message");
var title = document.querySelector("#title");
var new_color = document.querySelector("#new-color");
var resetBtn = document.querySelector("#reset");

hardBtn.addEventListener("click", function() {
  hardBtn.classList.add("selected");
  easyBtn.classList.remove("selected");
  numSquares = NUM_HARD_MODE;
  init();
  if(!hardMode) {  //means just switched to hard mode from easy mode
    for(var i = rowSquares; i < maxSquares; i++){
      squares[i].style.display = "block";
    }
  }
  hardMode = true;
})

easyBtn.addEventListener("click", function() {
  easyBtn.classList.add("selected");
  hardBtn.classList.remove("selected");
  numSquares = NUM_EASY_MODE;
  init();
  if(hardMode) {  //means just switched to easy mode from hard mode
    for(var i = rowSquares; i < maxSquares; i++){
      squares[i].style.display = "none";
    }
  }
  hardMode = false;
});

resetBtn.addEventListener("click", init);


function generateRandomColors(numSquares) {
  for(var i = 0; i < numSquares; i++) {
    colors[i] = "rgb(" + Math.floor(Math.random() * 256) + ", "
    + Math.floor(Math.random() * 256) + ", " + Math.floor(Math.random() * 256) + ")";
  }
}

function populateSquares(){
  //generate random colors and paint the squares with the colors
  for(var i = 0; i < numSquares; i++) {
    squares[i].style.backgroundColor = colors[i];
    squares[i].addEventListener("click", checkColor);
  }
}
function checkColor() {
  if(this.style.backgroundColor === pickedColor) {
    console.log("correct!");
    isCorrect = true;
    message.textContent = "CORRECT!";
    title.style.backgroundColor = pickedColor;
    //if the guess is corret, then remove square events, and show the play again button
    //to initialize the game.
    removeEvents();
    new_color.style.display = "none";
    resetBtn.style.display = "block";
  }else {
    isCorrect = false;
    message.textContent = "WRONG";
    this.style.backgroundColor = "#1e1a07";
  }
}
function pickColor(){
  //pick one color from the new colors array to be the guessing color.
  pickedColor = colors[Math.floor(Math.random() * numSquares)];
  //display the color's rgb value on the title
  pickedColorHTML.textContent = pickedColor;
}


function removeEvents() {
  for(var i = 0; i < numSquares; i++) {
    squares[i].removeEventListener("click", checkColor);
  }

}

function init(){
  title.style.backgroundColor = "#1e1a07";
  new_color.style.display = "inline";
  message.textContent = "WELCOME";
  isCorrect = false;
  resetBtn.style.display = "none";
  generateRandomColors(numSquares);
  populateSquares();
  pickColor();
}


init();
