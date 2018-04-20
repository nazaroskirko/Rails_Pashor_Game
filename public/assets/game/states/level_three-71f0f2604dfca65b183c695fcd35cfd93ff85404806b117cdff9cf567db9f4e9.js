//LevelThree game execution

var curScore;
var stateThree = true;
var LevelThree = function(game){

}

LevelThree.prototype = {
//Phaser Core Functions

    preload: function(){
      //Dynamic Assets - Items from /items
      console.log("Preloading LevelThree...");
      Session.items = game.cache.getJSON('levelOneItems');
      LevelTemplate.loadLevelItems();
    },

    create: function() {
      console.log("Creating LevelThree...");
      // Physics, Background, Stage
      LevelTemplate.setupGameProps();
      // Bins, Clocks, Buttons, Sortable Group
      LevelTemplate.setupSprites();
      // Initialize Session variables, most time
      LevelTemplate.setupSession();
      //Set the first item
      SessionManager.setNextItem(this);
    },

    render: function() {
      //Update Timer bar to decrease, color changes, etc.
      LevelTemplate.renderTimerBar();
    },

    update: function() {
      //Check for overlap between sprites (bins/item) at 60fps
      LevelTemplate.checkCollission();
      LevelTemplate.checkLevelComplete('levelOneSummary');
    }

}
;
