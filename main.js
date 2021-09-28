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
});

window.addEventListener('load', function(){
  newGame();
  window.localStorage.clear();
});

function newGame(){
  //new game on page load
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
    //show bad moon, add data to game.board, check win, change turn
    if(Number.isInteger(clickedTileID)){
      currentGame.board.p1.push(clickedTileID);
      updateBoard();
    }

    if(currentGame.checkWin()){
      playerTurn.innerText = `${currentGame.p1.token} won!`;
      currentGame.p1.saveWinsToStorage();
      p1Score.innerText = `${currentGame.p1.retrieveWinsFromStorage().length} wins`;
      newGame();
      setTimeout(reset, 2000);
      return;
    }
    if(currentGame.checkDraw()){
      playerTurn.innerText = 'It\'s a draw!';
      newGame();
      setTimeout(reset, 2000);
      return;
    }

    if(Number.isInteger(clickedTileID)){
      currentGame.checkDraw()
      currentGame.changeTurn();
      updateDOM();
    }
  } else if(currentGame.turn === 1){
    //show good moon, add data to game.board, check win, change turn
    if(Number.isInteger(clickedTileID)){
      currentGame.board.p2.push(clickedTileID);
      updateBoard();
    }
    if(currentGame.checkWin()){
      playerTurn.innerText = `${currentGame.p2.token} won!`;
      currentGame.p2.saveWinsToStorage();
      p2Score.innerText = `${currentGame.p2.retrieveWinsFromStorage().length} wins`;
      newGame();
      setTimeout(reset, 2000);
      return;
    };
    if(currentGame.checkDraw()){
      playerTurn.innerText = 'It\'s a draw!';
      newGame();
      setTimeout(reset, 2000);
      return;
    }
    if(Number.isInteger(clickedTileID)){
      currentGame.checkDraw();
      currentGame.changeTurn();
      updateDOM();
    }
  }
}

function updateDOM(){
  var currentGame = games[games.length-1];
  //update player turn
  if(currentGame.turn === 0){
    playerTurn.innerText = `${currentGame.p1.token}\'s turn`;
  } else if(currentGame.turn === 1){
    playerTurn.innerText = `${currentGame.p2.token}\'s turn`;
  }
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

function reset(){
  console.log('resetting now');
  var previousGame = games[games.length-2];
  if(previousGame.p1.wins.length > previousGame.p2.wins.length){
    playerTurn.innerText = `${previousGame.p1.token}'s turn`;
  } else{
    playerTurn.innerText = `${previousGame.p2.token}'s turn`;
  }

  for(var i = 0; i < gameTiles.length; i++){
    gameTiles[i].firstElementChild.innerText = '';
    gameTiles[i].firstElementChild.classList.remove('red-outline');
  }
}
