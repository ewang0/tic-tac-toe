class Player {
  constructor(playerNum, token, wins){
    this.id = playerNum;
    this.token = token;
    if(wins){
      this.wins = wins;
    } else{
      this.wins = [];
    }
  }
  saveWinsToStorage(){}
  retrieveWinsFromStorage(){}
}
