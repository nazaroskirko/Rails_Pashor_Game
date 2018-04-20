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
        Bin.allBins['foodScrapsBinImage'].sprite = foodBinSprite;
        Bin.allBins['garbageBinImage'].sprite = garbageBinSprite;
        Bin.allBins['paperBinImage'].sprite = paperBinSprite;
        Bin.allBins['recycleBinImage'].sprite = recycleBinSprite;

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
        timerBar = new Phaser.Rectangle(260, 35, 120, 20);
        Session.gameTimer = game.time.events.loop(100, function(){ SessionManager.updateTimer()});

    //Set the first item
        SessionManager.setNextItem(this);


    emitter = game.add.emitter(0, 0, 100);

    emitter.makeParticles('star');
    emitter.gravity = 100;
    },

    render: function() {
      if (Session.timeElapsed > 3) {
        game.debug.geom(timerBar,'#ff0000');
      } else {
        game.debug.geom(timerBar,'#008000');
      }
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
          setTimeout(function() {
             game.state.start('levelOneSummary', Phaser.Plugin.StateTransition.Out.SlideTop, Phaser.Plugin.StateTransition.In.SlideTop);
          }, 2000);
      }

    },
    //Callback on overlap, checked on update()
    collisionCallback: function(item, bin) {
      //Do not let bin recieve if user has not released mouse
      if(game.input.activePointer.leftButton.isDown){
        setTimeout(function() {
           var tweenA = game.add.tween(bin).to({ y: 570 }, 100, 'Linear', true, 0);
        }, 100);
        var tweenA = game.add.tween(bin).to({ y: 470 }, 100, 'Linear', true, 0);
        return false;
      }
      Bin.recieveItem(Session.currentItem,bin.key, this);
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
