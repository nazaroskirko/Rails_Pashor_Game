//LevelOne game execution
var LevelOne = function(game){

}

LevelOne.prototype = {
//Phaser Core Functions

    preload: function(){
      //Dynamic Assets - Items from /items
      Session.items = game.cache.getJSON('levelOneItems');
      LevelTemplate.loadLevelItems();
    },

    create: function() {
      console.log("Creating LevelOne...");
      //Buttons
      // Physics, Background, Stage
      LevelTemplate.setupGameProps();
      // Bins, Clocks, Buttons, Sortable Group
      LevelTemplate.setupSprites();
      // Initialize Session variables, most time
      LevelTemplate.setupSession();
      levelOneButtonSprite = game.add.sprite(50,30, "levelOneButton");
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
