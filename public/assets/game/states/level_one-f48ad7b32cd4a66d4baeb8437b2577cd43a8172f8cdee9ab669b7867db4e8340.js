//LevelOne game execution
var LevelOne = function(game){

}

LevelOne.prototype = {
//Phaser Core Functions

    preload: function(){
    //Dynamic Assets - Items from /items
        console.log("Preloading LevelOne...");
        Session.items = game.cache.getJSON('levelOneItems');
        this.loadLevelOneItems();
    },

    create: function() {
    //Get Cached JSON to load
        console.log("Creating LevelOne...");
    //Set Game Properties
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#d1e4c8';
    //Display Static Assets
        game.add.tileSprite(0, 0, 1250, 750, 'backgroundImage');
        foodBinSprite = game.add.sprite(30,570, "foodScrapsBinImage");
        garbageBinSprite = game.add.sprite(330,570, "garbageBinImage");
        paperBinSprite = game.add.sprite(630,570, "paperBinImage");
        recycleBinSprite = game.add.sprite(930,570, "recycleBinImage");
        clockSprite = game.add.sprite(200,20, "clock");
        levelOneButtonSprite = game.add.sprite(50,30, "levelOneButton");

        game.physics.enable([recycleBinSprite,foodBinSprite,garbageBinSprite,paperBinSprite], Phaser.Physics.ARCADE);

    //Set Groups
        sortable_items_group = game.add.group();
        sortable_items_group.inputEnableChildren = true;

    //Timer
        Session.startTime_date = new Date(); //return current computer time
        Session.startItemTime = 120; //set for the first item #CONFIG
        Session.totalTime = 120; //Defines how long the game is
        Session.timeElapsed = 0;
        UIManager.createTimer(); //sets up timer ui

        Session.gameTimer = game.time.events.loop(100, function(){ SessionManager.updateTimer()});

    //Set the first item
        SessionManager.setNextItem(this);
    },

    render: function() {
        //Add after effects at 30fps after render
    },

    update: function() {
    //Check for overlap between sprites (bins/item) at 60fps
      game.physics.arcade.overlap(Session.currentSprite, [recycleBinSprite,garbageBinSprite,paperBinSprite,recycleBinSprite,foodBinSprite], this.collisionCallback, null, this);
    //Check if level is completed, flag is set in Session Manager
      if(Session.levelCompleteFlag == true){
          StatsManager.computeLevelData(Session); // pass a copy so that session can be cleared safely w/o worrying about async
          APIManager.postResponses(Session.responses);
          SessionManager.clearSession();
          game.state.start('levelOneSummary');
      }

    },
    //Callback on overlap, checked on update()
    collisionCallback: function(obj1, obj2) {
      //Do not let bin recieve if user has not released mouse
      if(game.input.activePointer.leftButton.isDown){
        return false;
      }
      Bin.recieveItem(Session.currentItem,obj2.key, this);
    },

//Helpers
    loadLevelOneItems: function(){
        console.log("Loading Level One Items..");
        //Sortable Item Images
        for (var index in Session.items) {
            console.log("Loading image: " + Session.items[index].name + "\n@" + Session.items[index].image_url.url + "\n");
            game.load.image(Session.items[index].name, Session.items[index].image_url.url);
        }
        //Background Images

    }

}
;
