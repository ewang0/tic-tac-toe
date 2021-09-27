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

  checkDraw(){
    var p1Board = this.board.p1;
    var p2Board = this.board.p2;
    var tilesFilled = (p1Board.length + p2Board.length === 9);
    console.log(p1Board.length + p2Board.length);
    if(tilesFilled){
      console.log('tiles are filled!');
      return true;
    }
  }

  checkWin(){
    var p1Board = this.board.p1.sort();
    var p2Board = this.board.p2.sort();

    for(var i = 0; i < p1Board.length; i++){
      if((p1Board[i] === 1 || p1Board[i] === 4 || p1Board[i] === 7) && p1Board.includes(p1Board[i]+1) && p1Board.includes(p1Board[i]+2)){
        console.log('win');
        this.p1.wins.push(this.board);
        return true;
    } else if(p1Board[i] === 3 && p1Board.includes(p1Board[i]+2) && p1Board.includes(p1Board[i]+4)){
        console.log('win');
        this.p1.wins.push(this.board);
        return true;
      } else if(p1Board.includes(p1Board[i]+3) && p1Board.includes(p1Board[i]+6)){
        console.log('win');
        this.p1.wins.push(this.board);
        return true;
      } else if(p1Board.includes(p1Board[i]+4) && p1Board.includes(p1Board[i]+8)){
        console.log('win');
        this.p1.wins.push(this.board);
        return true;
      }
    }

    for(var i = 0; i < p2Board.length; i++){
      if((p2Board[i] === 1 || p2Board[i] ===  4 || p2Board[i] === 7) && p2Board.includes(p2Board[i]+1) && p2Board.includes(p2Board[i]+2)){
        console.log('win');
        this.p2.wins.push(this.board);
        return true;
    } else if(p2Board[i] === 3 && p2Board.includes(p2Board[i]+2) && p2Board.includes(p2Board[i]+4)){
        console.log('win');
        this.p2.wins.push(this.board);
        return true;
      } else if(p2Board.includes(p2Board[i]+3) && p2Board.includes(p2Board[i]+6)){
        console.log('win');
        this.p2.wins.push(this.board);
        return true;
      } else if(p2Board.includes(p2Board[i]+4) && p2Board.includes(p2Board[i]+8)){
        console.log('win');
        this.p2.wins.push(this.board);
        return true;
      }
    }
  }
}
