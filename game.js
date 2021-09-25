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
  }

  inArray(){

  }
}
