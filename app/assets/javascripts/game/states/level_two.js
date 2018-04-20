//LevelOne game execution
var LevelTwo = function(game){

}

LevelTwo.prototype = {
//Phaser Core Functions

    preload: function(){
    //Dynamic Assets - Items from /items
        console.log("Preloading LevelTwo...");
        Session.items = game.cache.getJSON('levelTwoItems');
        LevelTemplate.loadLevelItems();
    },

    create: function() {
        console.log("Creating LevelTwo...");
        // Physics, Background, Stage
        LevelTemplate.setupGameProps();
        // Bins, Clocks, Buttons, Sortable Group
        LevelTemplate.setupSprites();
        //Buttons
        var levelTwoButtonSprite = game.add.sprite(50,30, "levelTwoButton");
        // Initialize Session variables, most time
        LevelTemplate.setupSession();
        //Set the first item
        SessionManager.setNextItem(this);
    },

    render: function() {

    },

    update: function() {
      //Check for overlap between sprites (bins/item) at 60fps
      LevelTemplate.checkCollission();
      //Start next state
      LevelTemplate.checkLevelComplete('levelTwoSummary');
    }

}
