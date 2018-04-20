var LevelTemplate = {
//PRELOAD
  loadLevelItems: function() {
    //Sortable Item Images
    for (var index in Session.items) {
        game.load.image(Session.items[index].name, Session.items[index].image_url.url);
    }
  },
//CREATE
  setupGameProps: function() {
    //Set Game Properties
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#d1e4c8';
  },

  setupSprites: function() {
    //Display Static Assets
        game.add.tileSprite(0, 0, 1250, 750, 'backgroundImage');
        //Bins
        var foodBinSprite = game.add.sprite(30,570, "foodScrapsBinImage");
        var garbageBinSprite = game.add.sprite(330,570, "garbageBinImage");
        var paperBinSprite = game.add.sprite(630,570, "paperBinImage");
        var recycleBinSprite = game.add.sprite(930,570, "recycleBinImage");
        //Global access to bin sprites
        Bin.allBins['foodScrapsBinImage'].sprite = foodBinSprite;
        Bin.allBins['garbageBinImage'].sprite = garbageBinSprite;
        Bin.allBins['paperBinImage'].sprite = paperBinSprite;
        Bin.allBins['recycleBinImage'].sprite = recycleBinSprite;
        //Timing
        timerBar = new Phaser.Rectangle(260, 35, 120, 25);
        timerBarContainer = game.add.sprite(253, 30, "timerBarContainer");
        //Audio
        soundCorrect = game.add.audio('correctSound');
        soundIncorrect = game.add.audio('incorrectSound');
        //Animations
        emitter = game.add.emitter(0, 0, 100);
        emitter.makeParticles('star');
        emitter.gravity = 100;
        game.physics.enable([recycleBinSprite,foodBinSprite,garbageBinSprite,paperBinSprite], Phaser.Physics.ARCADE);
        //Set Groups for items/bins for common functions like drag
        sortable_items_group = game.add.group();
        sortable_items_group.inputEnableChildren = true;

  },

  setupSession: function() {
        Session.startTime_date = new Date(); //return current computer time
        Session.startItemTime = 120; //set for the first item #CONFIG
        Session.totalTime = 120; //Defines how long the game is
        Session.timeElapsed = 0;
        UIManager.createTimer(); //sets up timer ui
        //updateTimer functioin to manage the gameTimer
        Session.gameTimer = game.time.events.loop(100, function(){ SessionManager.updateTimer()});
  },
//RENDER
    renderTimerBar: function() {
      if (Session.timeElapsed > 20) {
        game.debug.geom(timerBar,'#ff0000');
      } else {
        game.debug.geom(timerBar,'#008000');
      }
    },
//UPDATE
  checkCollission: function() {
    //Check for overlap between sprites (bins/item) at 60fps
      game.physics.arcade.overlap(Session.currentSprite,
        [Bin.allBins['recycleBinImage'].sprite,
        Bin.allBins['garbageBinImage'].sprite,
        Bin.allBins['paperBinImage'].sprite,
        Bin.allBins['foodScrapsBinImage'].sprite],
      this.collisionCallback, null, this);
  },
  //Callback on overlap, checked on update()
  collisionCallback: function(item, bin) {
    //Do not let bin recieve if user has not released mouse
    if(game.input.activePointer.leftButton.isDown){
      UIManager.animateBinHover(bin); // Pushes bin up on hover, and down otherwise
      return false;
    }
    Bin.recieveItem(Session.currentItem,bin.key, this);
  },

  checkLevelComplete(nextState) {
    //Check if level is completed, flag is set in Session Manager
      if(Session.levelCompleteFlag == true){
          StatsManager.computeLevelData(Session); // pass a copy so that session can be cleared safely w/o worrying about async
          APIManager.postResponses(Session.responses);
          SessionManager.clearSession();
          setTimeout(function() {
             game.state.start(nextState, Phaser.Plugin.StateTransition.Out.SlideTop, Phaser.Plugin.StateTransition.In.SlideTop);
          }, 2000);
      }
  },

  createLevelSummary: function() {
    game.add.text(game.world.centerX - 400, 100, "Lvl 1:", {font: "50px Arial", fill: "#fff"});
    game.add.text(game.world.centerX, 100, GameData.levelOneScore, {font: "50px Arial", fill: "#fff"});

    game.add.text(game.world.centerX - 400, 200, "Lvl 2:", {font: "50px Arial", fill: "#fff"});
    game.add.text(game.world.centerX, 200, GameData.levelTwoScore, {font: "50px Arial", fill: "#fff"});

    game.add.text(game.world.centerX - 400, 300, "Correctly Sorted:", {font: "50px Arial", fill: "#fff"});
    game.add.text(game.world.centerX, 300, GameData.numberOfCorrect, {font: "50px Arial", fill: "#fff"});

    game.add.text(game.world.centerX - 400, 400, "numberofIncorrect:", {font: "50px Arial", fill: "#fff"});
    game.add.text(game.world.centerX, 400, GameData.numberOfIncorrect, {font: "50px Arial", fill: "#fff"});

    game.add.text(game.world.centerX - 400, 500, "Total Points:", {font: "50px Arial", fill: "#fff"});
    game.add.text(game.world.centerX, 500, GameData.totalScore, {font: "50px Arial", fill: "#fff"});
  }

}
;
