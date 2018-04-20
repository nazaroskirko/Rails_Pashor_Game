Bin.allBins = {}

function Bin(bin_id, name) {
  this.bin_id = bin_id;
  this.name = name;
  Bin.allBins[name] = this;
}

//Static method for receiving a genric item in any bin
Bin.recieveItem = function(item, bin_name, state){
    console.log("item id" + item.id);
    console.log("Bin selected" + Bin.allBins[bin_name].bin_id);

    if(item.bin_id == Bin.allBins[bin_name].bin_id)
    {
      Session.responses.push({
        "bin_id" : Bin.allBins[bin_name].bin_id,
        "item_id" : item.bin_id
      });
      UIManager.showCorrectCircle(Session.item_counter);
      UIManager.deleteCurrentItem(Session.currentSprite);
      SessionManager.setNextItem(state);
      console.log(Session);
    }
    else
    {
      console.log("incorrect");
      Session.responses.push({
        "bin_id" : Bin.allBins[bin_name].bin_id,
        "item_id" : item.bin_id
      });
      UIManager.showIncorrectCircle(Session.item_counter);
      UIManager.deleteCurrentItem(Session.currentSprite);
      SessionManager.setNextItem(state);
      console.log(Session);
    }
}
;
