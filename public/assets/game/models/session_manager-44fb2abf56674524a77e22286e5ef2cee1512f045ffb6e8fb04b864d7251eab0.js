/* Keeps track of the user's sessions and enables 
 * events on user interaction. Delegates to other managers
 * from these initial events. 
 *
 *
 */

var Session = {

    items : [],

    currentSprite: null, //Phaser Sprite Object
    currentItem: null, //JS Object Item 

    levelScore : 0,
    item_counter : 0,
    levelCounter: 0,

    responses: [{
        item_id: 0,
        time_taken: 0,
        correct: false,
        bin_id: 3
    }],
    levelCompleteFlag: false

}

var LevelData = {
    numberOfCorrect: 0,
    timeSpent: 0,
    avgTimePerItem: 0,
    totalPoints: 0,
    timeBonus: 0
}

var SessionStats = {
   
//Some types of user data may or may not be stored 
    validUser: true,
    studentUser: true,
    finalScore: 0,
//Stored statistics 
    ItemStats : [{
        id : 0,
        correct: false,
        timeTaken : 0,
        selectedBin: 0
    }],
    LevelStats: [{
        id: 0,
        itemsCorrect: 0,
        timeTaken: 0,
        score: 0
    }],
    VersionStats: [{
        id: 0,
        itemsCorrect: 0,
        timeTaken: 0,
        score: 0 //version score may differ from final score

    }]   

}

var SessionManager = {

  updateSession : function(state){

  },

  clearSession: function(){
    Session = {

      items : [],

      currentSprite: null, //Phaser Sprite Object
      currentItem: null, //JS Object Item 

      levelScore : 0,
      item_counter : 0,
      levelCounter: 0,

      responses: [{
          item_id: 0,
          time_taken: 0,
          correct: false,
          bin_id: 0
      }],
      levelCompleteFlag: false

    }
  },

// Phaser defined Helpers
  onDragStart: function(sprite, pointer) {
      resultString = "Dragging" 
  },

  onDragStop: function(sprite, pointer) {
      resultString = " dropped at x:" + pointer.x + " y: " + pointer.y;
  },

// Custom Helpers
  setNextItem: function(state){
  //Ensure item is not null 
    if(Session.item_counter >= Session.items.length){
      Session.levelCompleteFlag = true;
      return;
    }
  //Check for Item Validity 
    Session.currentItem = Session.items[Session.item_counter]
    currentItem = Session.items[Session.item_counter]
  //Add item to sortable group
      Session.currentSprite = sortable_items_group.create(32, 100, Session.currentItem.name);
      Session.currentSprite.scale.setTo(0.5, 0.5);
  //Enable Physics for overlap detection
      game.physics.arcade.enable(Session.currentSprite); 
      Session.currentSprite.body.collideWorldBounds = true;
  //Enable drag/drop
      Session.currentSprite.input.enableDrag();
      Session.currentSprite.events.onDragStart.add(this.onDragStart, this);
      Session.currentSprite.events.onDragStop.add(this.onDragStop, this);

      Session.item_counter++;

  },

  overlap: function() {

  },

  checkGuess: function(){
      var collision = this.overlap();
      guessed = Dictionary.getBinKeyByID(collision);
      console.log("GUESS:" + Dictionary.getBinKeyByID(collision));
      if (collision) //either false or  1 - 4
      {
          if(Session.item_counter - 1 >= 0){
            var prevTime = Session.responses[Session.item_counter - 1].timeTaken
          }else{
            prevTime = 0;
          }
          return true;
      }
      else
      {
          return false;
      }

  },

  getTimeElapsed: function(){
    var currentTime = new Date();
    var timeDifference = Session.startTime.getTime() - currentTime.getTime();
    if(!timeDifference){
      console.log(timeDifference);
      return 4.43;
    }
    return Math.abs(timeDifference/1000);
  },

  updateTimer: function(){
 
    var currentTime = new Date();
    var timeDifference = Session.startTime.getTime() - currentTime.getTime();
 
    //Time elapsed in seconds
    Session.timeElapsed = this.getTimeElapsed();
 
    //Time remaining in seconds
    var timeRemaining = Session.totalTime - Session.timeElapsed; 
 
    //Convert seconds into minutes and seconds
    var minutes = Math.floor(timeRemaining / 60);
    var seconds = Math.floor(timeRemaining) - (60 * minutes);
 
    //Display minutes, add a 0 to the start if less than 10
    var result = (minutes < 10) ? "0" + minutes : minutes; 
 
    //Display seconds, add a 0 to the start if less than 10
    result += (seconds < 10) ? ":0" + seconds : ":" + seconds; 
 
    UIManager.timeLabel.text = result;

    if(Session.timeElapsed >= Session.totalTime){
      alert("Time Over");
      //TODO: change assets to red. 
    }
 
}




}
;
