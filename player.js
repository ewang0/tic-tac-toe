class Player {
  constructor(token, wins){
    this.token = token;
    this.id = `${this.token}${Date.now()}`;
    if(wins){
      this.wins = wins;
    } else{
      this.wins = [];
    }
  }
  saveWinsToStorage(){
    var stringGame = JSON.stringify(this.wins);
    window.localStorage.setItem(this.id, stringGame);
  }
  retrieveWinsFromStorage(){
    var allWins = [];
    for(var i = 0; i < localStorage.length; i++){
      if(localStorage.key(i).includes(this.token)){
        var storedWin = localStorage.getItem(localStorage.key(i));
        var win = JSON.parse(storedWin);
        allWins.push(win);
      }
    }
    return allWins;
  }
}
