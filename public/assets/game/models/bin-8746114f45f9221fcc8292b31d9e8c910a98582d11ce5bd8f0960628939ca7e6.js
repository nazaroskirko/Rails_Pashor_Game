Bin.allBins = {}

// Constructor
function Bin(bin_id, name) {
  this.bin_id = bin_id;
  this.name = name;
  Bin.allBins[name] = this;
}

// Static method for receiving a genric item in any bin
/**
  *@event Submit#levelresponses
  *@event UI#showCorrect
  */
Bin.recieveItem = function(item, bin_name, state){
    var timeForItem = Session.startItemTime - Session.currentTime;
    if(item.bin_id === Bin.allBins[bin_name].bin_id)
    {
      console.log("correct");
      console.log(Session.itemAttemps);
      Session.responses.push({
        "bin_id" : Bin.allBins[bin_name].bin_id,
        "item_id" : item.bin_id,
        "correct" : true,
        "attempt" : Session.itemAttemps,
        "time_taken": timeForItem
      });
      console.log(Session.itemAttemps);
      UIManager.correctSequence(bin_name);
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
      console.log(Session.itemAttemps);
      UIManager.incorrectSequence(bin_name);
            Session.itemAttemps += 1; // has to be done after sequence
    }
}
;
