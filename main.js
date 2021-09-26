var games = [];

//query selector variables
var grid = document.querySelector('#gridContainer');
var p1Score = document.querySelector('#p1Score');
var p2Score = document.querySelector('#p2Score');
var playerTurn = document.querySelector('#playerTurn');
var gameTiles = document.querySelectorAll('.grid-item');

//event listeners
grid.addEventListener('click', function(){
  getBoxID(event);
  updateDOM();
});
window.addEventListener('load', newGame);

function newGame(){
  //new game on page load
  var p1 = new Player(1, '🌚');
  var p2 = new Player(2, '🌝');
  var game = new Game(p1, p2);
  games.push(game);
}

//event handler and helper functions
function getBoxID(event){
  var currentGame = games[games.length-1];
  if(currentGame.turn === 0){
    //show bad moon, add data to game.board, check win, change turn
      currentGame.board.p1.push(parseInt(event.target.id));
      currentGame.cleanBoards();
      updateBoard();
    if(currentGame.checkWin()){
      p1Score.innerText = `${currentGame.p1.wins.length} wins`;
      playerTurn.innerText = `${currentGame.p1.token} won!`;
      newGame();
      setTimeout(clear, 2000);
      // updateBoard();
    }
    currentGame.changeTurn();
  } else if(currentGame.turn === 1){
    //show good moon, add data to game.board, check win, change turn
      currentGame.board.p2.push(parseInt(event.target.id));
      currentGame.cleanBoards();
      updateBoard();
    if(currentGame.checkWin()){
      p2Score.innerText = `${currentGame.p2.wins.length} wins`;
      playerTurn.innerText = `${currentGame.p2.token} won!`;
      newGame();
      setTimeout(clear, 2000);
      //updateBoard();
    };
    currentGame.changeTurn();
  }
}

function playerWon(playerToken){
  playerTurn.innerText = playerToken;
}

function updateDOM(){
  var currentGame = games[games.length-1];
  //update player turn
  if(currentGame.turn === 0){
    playerTurn.innerText = `It\'s ${currentGame.p1.token}\'s turn`;
  } else if(currentGame.turn === 1){
    playerTurn.innerText = `It\'s ${currentGame.p2.token}\'s turn`;
  } else{

  }
  //update board
}


function updateBoard(){
  var currentGame = games[games.length-1];
  var p1Board = currentGame.board.p1;
  var p2Board = currentGame.board.p2;
  //var gameTiles = document.querySelectorAll('.grid-item');

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

function clear(){
  console.log('clearing now');

  for(var i = 0; i < gameTiles.length; i++){
    gameTiles[i].firstElementChild.innerText = '';
    gameTiles[i].firstElementChild.classList.remove('red-outline');
  }
}
