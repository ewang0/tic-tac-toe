var games = [];

//query selector variables
var grid = document.querySelector('#gridContainer');
var p1Score = document.querySelector('#p1Score');
var p2Score = document.querySelector('#p2Score');
var playerTurn = document.querySelector('#playerTurn');
var gameTiles = document.querySelectorAll('.grid-item');

//event listeners
grid.addEventListener('mouseover', highlight);
grid.addEventListener('mouseout', removeHighlight);
grid.addEventListener('click', function(){
  getBoxID(event);
});
window.addEventListener('load', function(){
  newGame();
  window.localStorage.clear();
  setTimeout(welcome, 3000);
  freeze();
});

function newGame(){
  var p1 = new Player('🌚');
  var p2 = new Player('🌝');
  var game = new Game(p1, p2);
  games.push(game);
}

//event handler and helper functions
function getBoxID(event){
  var currentGame = games[games.length-1];
  var clickedTileID = parseInt(event.target.id);

  if(currentGame.turn === 0){
    addMove(clickedTileID, currentGame.board.p1);
    checkWinOrDraw(currentGame.p1);
  } else if(currentGame.turn === 1){
    addMove(clickedTileID, currentGame.board.p2);
    checkWinOrDraw(currentGame.p2);
  }
}

function addMove(tile, playerBoard){
  if(Number.isInteger(tile)){
    playerBoard.push(tile);
    displayBoard();
  }
}

function checkWinOrDraw(currentPlayer){
  var currentGame = games[games.length-1];
  var clickedTileID = parseInt(event.target.id);

  if(currentGame.checkWin()){
    playerTurn.innerText = `${currentPlayer.token} won!`;
    currentPlayer.saveWinsToStorage();
    displayWins()
    newGame();
    freeze();
    setTimeout(reset, 2000);
    return;
  }
  if(currentGame.checkDraw()){
    playerTurn.innerText = 'It\'s a draw!';
    newGame();
    freeze();
    setTimeout(reset, 2000);
    return;
  }
  if(Number.isInteger(clickedTileID)){
    currentGame.checkDraw()
    currentGame.changeTurn();
    displayTurn();
  }
}

function displayWins(){
  var currentGame = games[games.length-1];

  p1Score.innerText = `${currentGame.p1.retrieveWinsFromStorage().length} wins`;
  p2Score.innerText = `${currentGame.p2.retrieveWinsFromStorage().length} wins`;
}

function displayTurn(){
  var currentGame = games[games.length-1];

  if(currentGame.turn === 0){
    playerTurn.innerText = `${currentGame.p1.token}\'s turn`;
    unfreeze();
  } else if(currentGame.turn === 1){
    playerTurn.innerText = `${currentGame.p2.token}\'s turn`;
    unfreeze();
  }
}


function displayBoard(){
  var currentGame = games[games.length-1];
  var p1Board = currentGame.board.p1;
  var p2Board = currentGame.board.p2;

  for(var i = 0; i < p1Board.length; i++){
    var gameTile = document.getElementById(`${p1Board[i]}`);
    gameTile.firstElementChild.innerText = currentGame.p1.token;
  }

  for(var i = 0; i < p2Board.length; i++){
    var gameTile = document.getElementById(`${p2Board[i]}`);
    gameTile.firstElementChild.innerText = currentGame.p2.token;
    gameTile.firstElementChild.classList.add('red-outline');
  }
}

function reset(){
  var previousGame = games[games.length-2];
  var currentGame = games[games.length-1]

  if(previousGame.p1.wins.length > previousGame.p2.wins.length){
    currentGame.turn = 0;
    playerTurn.innerText = `${previousGame.p1.token}'s turn`;
    unfreeze();
  } else{
    currentGame.turn = 1;
    playerTurn.innerText = `${previousGame.p2.token}'s turn`;
    unfreeze();
  }

  for(var i = 0; i < gameTiles.length; i++){
    gameTiles[i].firstElementChild.innerText = '';
    gameTiles[i].firstElementChild.classList.remove('red-outline');
  }
}

function highlight(event){
  var currentGame = games[games.length-1];
  if(currentGame.turn == 0 && !event.target.firstElementChild.innerText){
    event.target.classList.add('highlight');
  } else if(currentGame.turn == 1 && !event.target.firstElementChild.innerText){
    event.target.classList.add('highlight');
  }
}

function removeHighlight(event){
  event.target.classList.remove('highlight')
}

function freeze(){
  grid.classList.add('freeze');
}

function unfreeze(){
  grid.classList.remove('freeze');
}

function welcome(){
  var currentGame = games[games.length-1];

  playerTurn.innerText = 'randomizing turn...';
  currentGame.turn = Math.floor(Math.random() * 2);
  setTimeout(displayTurn, 1500);
}
