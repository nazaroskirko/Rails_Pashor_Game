
// Handles all UI states

var UIManager = {

  displayCorrectResponse: function(binKey){
    this.showCheckmark(binKey);
  },

  displayIncorrectResponse: function(errorMessage, binKey){
    this.showCross(binKey);
  },

  createTimer: function(){

    this.timeLabel = game.add.text(260, 30, "00:00", {font: "30px Arial", fill: "#fff"});
    this.timeLabel.align = 'center';

  },
  showCheckmark: function(binKey){
    var location = Dictionary.getBinLocationByKey(binKey);
    console.log(location);
    var checkmark = game.add.sprite(location[0],location[1], "checkmark");
    checkmark.scale.setTo(0.5,0.5);
    setTimeout(function(){
        checkmark.kill();
      }, 1000);
  },

  showCross: function(binKey){
  var location = Dictionary.getBinLocationByKey(binKey);
  console.log(location);
  var cross = game.add.sprite(location[0],location[1], "cross");
  cross.scale.setTo(0.25,0.25);
  setTimeout(function(){
      cross.kill();
    }, 1000);
  },

  showCorrectCircle: function(numOfResponses){
    var base = 900;
    var increment = 50;
    console.log("Base")
    console.log(numOfResponses);
    var cross = game.add.sprite(base+increment*numOfResponses, 50, "correctCircleImage");
  },

  showIncorrectCircle: function(numOfResponses){
    var base = 900;
    var increment = 50;
    console.log("Base")
    console.log(numOfResponses);
    var cross = game.add.sprite(base+increment*numOfResponses, 50, "incorrectCircleImage");
  },

  deleteCurrentItem: function(itemSprite){
    itemSprite.kill();
  },

  resetItem:function(itemSprite){
     itemSprite.body.x = 600;
     itemSprite.body.y = 100;
  }

}
;
