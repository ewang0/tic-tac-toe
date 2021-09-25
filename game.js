class Game {
  constructor(p1, p2){
    this.p1 = p1;
    this.p2 = p2;
    this.turn = 0;
    this.board = {p1:[], p2:[]};
  }

  changeTurn(){
    if(this.turn === 0){
      this.turn = 1;
    } else if(this.turn === 1){
      this.turn = 0;
    }
  }

  checkWin(){
    var p1Board = this.board.p1.sort();
    for(var i = 0; i < p1Board.length; i++){
      if(p1Board.includes(p1Board[i]+1) && p1Board.includes(p1Board[i]+2)){
        console.log('win');
      } else if(p1Board.includes(p1Board[i]+2) && p1Board.includes(p1Board[i]+4)){
        console.log('win');
      } else if(p1Board.includes(p1Board[i]+3) && p1Board.includes(p1Board[i]+6)){
        console.log('win');
      } else if(p1Board.includes(p1Board[i]+4) && p1Board.includes(p1Board[i]+8)){
        console.log('win');
      }
    }
  }
}
