var games = [];

//query selector variables
var grid = document.querySelector('#gridContainer');
var p1Score = document.querySelector('#p1Score');
var p2Score = document.querySelector('#p2Score');
var playerTurn = document.querySelector('#playerTurn');

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
    //show bad moon, change turn
    event.target.firstElementChild.innerText = currentGame.p1.token;
    currentGame.board.p1.push(event.target.id);
    currentGame.changeTurn();
  } else if(currentGame.turn === 1){
    //show good moon, change turn
    event.target.firstElementChild.innerText = currentGame.p2.token;
    event.target.lastElementChild.classList.add('red-outline');
    currentGame.board.p2.push(event.target.id);
    currentGame.changeTurn();
  }

}

function updateDOM(){
  var currentGame = games[games.length-1];
  //update player turn
  if(currentGame.turn === 0){
    playerTurn.innerText = `It\'s ${currentGame.p1.token}\'s turn`;
  } else if(currentGame.turn === 1){
    playerTurn.innerText = `It\'s ${currentGame.p2.token}\'s turn`;
  }
  //update board

}
