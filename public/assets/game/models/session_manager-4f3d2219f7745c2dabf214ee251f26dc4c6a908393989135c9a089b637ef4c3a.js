/* Keeps track of the user's sessions and enables
 * events on user interaction. Delegates to other managers
 * from these initial events.
 *
 *
 */


var TOTAL_TIME = 0;
var Session = {

  items: [],

  currentSprite: null,       // Phaser Sprite Object
  currentItem: null,         // JS Object Item

  currentTime: null,         // Time elapsed since level started in s
  startTime_date: null,      // Date object used to calculate current time
  startItemTime: null,       // When the item was shown on the screen in s
  endItemTime: null,         // When item was accepted by a bin
  itemAttemps: null,         // Tracks number of retries
  totalTime: null,           // Admin set time for level

  levelScore: 0,             // Level score for the current level
  item_counter: 0,           // Index for keeping track of which item in the items arr

  responses: [],             //Array of response objects, sample below
                              //   {item_id: 0,
                              //   time_taken: 0,
                              //   correct: false,
                              //   bin_id: 0}

  levelCompleteFlag: false,    // Is the level complete? Checked on update()
  starEmitter: null, // phaser object to do burst animations for each level
}

// Holds calculated level data every level when sessions are cleared. Modified in Stats Manager, computeLevelData()
var LevelData = {
  numberOfCorrect: 0,
  numberOfIncorrect: 0,
  levelTime: 0,
  totalPoints: 0,
  timeBonus: 0
}

// Holds calculated data for the whole game, modified at the end of each level.
var GameData = {
  levelOneScore: 0,
  levelTwoScore: 0,
  levelThreeScore: 0,
  levelOneTime: 0,
  levelTwoTime: 0,
  levelThreeTime: 0,
  totalScore: 0,
  version: 1, // #CONFIG Set version
  numberOfCorrect: 0,
  numberofIncorrect: 0,
  validUser: true
}


var SessionManager = {

  clearSession: function() {
    Session = {

      items: [],
      itemAttemps: 0,
      currentSprite: null, //Phaser Sprite Object for phaser operations (collison)
      currentItem: null, //JS Object Item for calculations

      currentTime: null,
      startTime_date: null,
      startItemTime: null,
      endItemTime: null,
      totalTime: null,

      levelScore: 0,
      item_counter: 0,

      responses: [],

      levelCompleteFlag: false

    }
  },

  clearLevelData: function() {
    LevelData = {
      numberOfCorrect: 0,
      numberOfIncorrect: 0,
      levelTime: 0,
      totalPoints: 0,
      timeBonus: 0
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
  setNextItem: function(state) {
    //Set attempts on new item to 0
    Session.itemAttemps = 0;
    //Checks if level is complete
    if (Session.item_counter >= Session.items.length) {
      Session.levelCompleteFlag = true;
      return;
    }
    //Set current item
    Session.currentItem = Session.items[Session.item_counter]
    //Set current Sprite and add item to sortable group to enable mouse input
      Session.currentSprite = sortable_items_group.create(550, 290, Session.currentItem.name); //TODO: Move to UI Manager??
    //Sets all physics and inputs for the item
    this.initializeItem();
    //Ensures the startItemTime is set after the first item
    if (Session.item_counter > 0) {
      console.log(Session.currentTime);
      Session.startItemTime = Session.currentTime;
    }

    Session.item_counter++;

  },

  //Sets all physics and inputs for the item
  initializeItem(){
    Session.currentSprite.scale.setTo(0.5, 0.5);
    //Enable Physics for overlap detection, collison with bins
    game.physics.arcade.enable(Session.currentSprite);
    Session.currentSprite.body.collideWorldBounds = true;
    //Enable drag/drop
    Session.currentSprite.input.enableDrag();
    //If you want to add events on drag
    // Session.currentSprite.events.onDragStart.add(this.onDragStart, this);
    // Session.currentSprite.events.onDragStop.add(this.onDragStop, this);
  },

  getTimeElapsed: function() {
    var currentTime = new Date();
    if (Session.startTime_date == null)
      return;
    var timeDifference = Session.startTime_date.getTime() - currentTime.getTime();
    return Math.abs(timeDifference / 1000);
  },

  updateTimer: function() {
  //Within Time Limit
    if (Session.timeElapsed < Session.totalTime - 1) {  // -1 so that the text changes after 0:01 than 0:00
      //Time elapsed in seconds
      Session.timeElapsed = this.getTimeElapsed();

      //Time remaining in seconds
      var timeRemaining = Session.totalTime - Session.timeElapsed; // #TODO: Use level stuff rather than session stuff

      //Convert seconds into minutes and seconds
      var minutes = Math.floor(timeRemaining / 60);
      var seconds = Math.floor(timeRemaining) - (60 * minutes);

      //Display minutes, add a 0 to the start if less than 10
      var result = (minutes < 10) ? "0" + minutes : minutes;
      //Display seconds, add a 0 to the start if less than 10
      result += (seconds < 10) ? ":0" + seconds : ":" + seconds;

      Session.currentTime = minutes * 60 + seconds;
      UIManager.timeLabel.text = result;
      timerBar.width = timeRemaining;
  //Past Time limit
    } else {
      timerBar.width = 0;
      timerBarContainer.visble = false;
      UIManager.timeLabel.text = "Time is over!";
    }

  }

}
;
