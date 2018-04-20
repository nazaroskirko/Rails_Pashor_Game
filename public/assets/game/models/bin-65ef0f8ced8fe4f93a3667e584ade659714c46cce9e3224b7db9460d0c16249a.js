Bin.allBins = {}

// Constructor
function Bin(bin_id, name) {
  this.bin_id = bin_id;
  this.name = name;
  Bin.allBins[name] = this;
}

// Static method for receiving a genric item in any bin
Bin.recieveItem = function(item, bin_name, state){
    var timeForItem = Session.startItemTime - Session.currentTime;
    console.log(Session.itemAttemps);
    if(item.bin_id == Bin.allBins[bin_name].bin_id)
    {
      console.log(Session.itemAttemps);
      Session.responses.push({
        "bin_id" : Bin.allBins[bin_name].bin_id,
        "item_id" : item.bin_id,
        "correct" : true,
        "attempt" : Session.itemAttemps,
        "time_taken": timeForItem
      });
      UIManager.showCorrectCircle(Session.item_counter);
      UIManager.particleBurst(bin_name);
      UIManager.deleteCurrentItem(Session.currentSprite);
      SessionManager.setNextItem(state);
    }
    else
    {
      console.log("incorrect");
      Session.responses.push({
        "bin_id" : Bin.allBins[bin_name].bin_id,
        "item_id" : item.bin_id,
        "attempt" : Session.itemAttemps,
        "correct" : false,
        "time_taken": timeForItem
      });
      Session.itemAttemps += 1;
      UIManager.showIncorrectCircle(Session.item_counter);
      UIManager.resetItem(Session.currentSprite);
      //Session.startItemTime = Session.currentTime;
      //SessionManager.setNextItem(state);
    }
    console.log(Session.responses);
}
;
