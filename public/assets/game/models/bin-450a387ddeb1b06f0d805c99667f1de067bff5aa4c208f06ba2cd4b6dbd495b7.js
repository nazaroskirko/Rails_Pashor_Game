Bin.allBins = {}

function Bin(bin_id, name) {
  this.bin_id = bin_id;
  this.name = name;
  Bin.allBins[name] = this;
}

//Static method for receiving a genric item in any bin
Bin.recieveItem = function(item, bin_name, state){

    Session.endItemTime = Session.currentTime;
    var timeForItem = Session.startItemTime - Session.endItemTime; 

    if(item.bin_id == Bin.allBins[bin_name].bin_id)
    {
      Session.responses.push({
        "bin_id" : Bin.allBins[bin_name].bin_id,
        "item_id" : item.bin_id,
        "correct" : true,
        "time_taken": timeForItem
      });
      UIManager.showCorrectCircle(Session.item_counter);
      UIManager.deleteCurrentItem(Session.currentSprite);
      SessionManager.setNextItem(state);
    }
    else
    {
      console.log("incorrect");
      Session.responses.push({
        "bin_id" : Bin.allBins[bin_name].bin_id,
        "item_id" : item.bin_id,
        "correct" : false,
        "time_taken": timeForItem
      });
      UIManager.showIncorrectCircle(Session.item_counter);
      UIManager.resetItem(Session.currentSprite);
      //Session.startItemTime = Session.currentTime;
      //SessionManager.setNextItem(state);
    }
    console.log(Session.responses);
}
;
